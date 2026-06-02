import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getAuthenticatedClient, tokensExist } from '@/lib/googleTokens';

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-private-password');

  if (password !== process.env.PRIVATE_ROUTE_PASSWORD) {
    return NextResponse.json({ authorized: false, connected: false }, { status: 401 });
  }

  if (!tokensExist()) {
    return NextResponse.json({
      authorized: true,
      connected: false,
      message: 'No Google Calendar token is configured.',
    });
  }

  try {
    const auth = await getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });
    await calendar.calendarList.list({ maxResults: 1 });

    return NextResponse.json({ authorized: true, connected: true });
  } catch (error) {
    console.error('Google Calendar status check failed:', error);
    return NextResponse.json({
      authorized: true,
      connected: false,
      message: 'Google Calendar token is expired or invalid. Re-authenticate to refresh it.',
    });
  }
}
