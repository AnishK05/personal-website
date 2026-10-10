import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getAuthenticatedClient, isCalendarAuthError } from '@/lib/googleTokens';

const ALERT_COOLDOWN_MS = 15 * 60 * 1000;

// Per serverless instance only, so this is a best-effort dedupe rather than a
// hard rate limit.
let lastAlertSentAt = 0;

async function calendarIsBroken(): Promise<boolean> {
  try {
    const auth = await getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });
    await calendar.calendarList.list({ maxResults: 1 });
    return false;
  } catch (error) {
    return isCalendarAuthError(error);
  }
}

async function sendAlertEmail() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ALERT_EMAIL_TO;
  if (!apiKey || !to) {
    throw new Error('RESEND_API_KEY and ALERT_EMAIL_TO must be set to send alerts.');
  }

  const reauthUrl = 'https://anishkalra.com/private';
  const sentAt = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.ALERT_EMAIL_FROM || 'Website Alerts <onboarding@resend.dev>',
      to: [to],
      subject: 'Google Calendar token expired — someone is trying to book a meeting',
      text: [
        'A visitor on anishkalra.com tried to book a meeting, but the Google Calendar credentials have expired.',
        '',
        `Re-authenticate here: ${reauthUrl}`,
        'Then update GOOGLE_TOKENS_JSON in Vercel and redeploy.',
        '',
        `Alert sent at ${sentAt} CT.`,
      ].join('\n'),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded with ${res.status}: ${await res.text()}`);
  }
}

export async function POST() {
  if (!(await calendarIsBroken())) {
    return NextResponse.json({ success: true, alreadyFixed: true });
  }

  if (Date.now() - lastAlertSentAt < ALERT_COOLDOWN_MS) {
    return NextResponse.json({ success: true });
  }

  try {
    await sendAlertEmail();
    lastAlertSentAt = Date.now();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Calendar alert error:', error);
    return NextResponse.json({ error: 'Failed to send alert.' }, { status: 500 });
  }
}
