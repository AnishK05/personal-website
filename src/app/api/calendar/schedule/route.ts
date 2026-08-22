import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getAuthenticatedClient } from '@/lib/googleTokens';
import { CALENDAR_TIME_ZONE } from '@/lib/calendarConfig';

export async function POST(request: NextRequest) {
  try {
    const { start, end, guestEmail, description } = await request.json();

    if (!start || !end || !guestEmail) {
      return NextResponse.json(
        { error: 'start, end, and guestEmail are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const auth = await getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const startDate = new Date(start);
    const formattedDate = startDate.toLocaleString('en-US', {
      timeZone: CALENDAR_TIME_ZONE,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    });

    const event = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: {
        summary: 'Meeting with Anish Kalra',
        description: [
          'A 30-minute meeting scheduled via anishkalra.com.',
          description?.trim() ? `\nNote from guest: ${description.trim()}` : '',
          '\nLooking forward to chatting!',
        ].join(''),
        start: {
          dateTime: start,
          timeZone: CALENDAR_TIME_ZONE,
        },
        end: {
          dateTime: end,
          timeZone: CALENDAR_TIME_ZONE,
        },
        attendees: [
          { email: guestEmail }
        ],
        conferenceData: {
          createRequest: {
            requestId: `meeting-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      },
    });

    const meetLink =
      event.data.conferenceData?.entryPoints?.find(
        (ep) => ep.entryPointType === 'video'
      )?.uri ?? null;

    return NextResponse.json({
      success: true,
      meetLink,
      eventId: event.data.id,
      formattedDate,
    });
  } catch (error) {
    console.error('Calendar schedule error:', error);
    return NextResponse.json(
      { error: 'Failed to schedule meeting. Please try again.' },
      { status: 500 }
    );
  }
}
