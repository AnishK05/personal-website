import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getAuthenticatedClient } from '@/lib/googleTokens';
import {
  CALENDAR_TIME_ZONE,
  SLOT_DURATION_MS,
  WORK_END_HOUR,
  WORK_START_HOUR,
  formatSlotLabel,
  getMinutesSinceMidnightInCalendarZone,
} from '@/lib/calendarConfig';

const LOOK_AHEAD_DAYS = 3;

export interface TimeSlot {
  start: string;
  end: string;
  label: string;
}

export async function GET() {
  try {
    const auth = await getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const now = new Date();
    // Start from next full 30-min boundary, at least 1 hour from now
    const rangeStart = new Date(now.getTime() + 60 * 60 * 1000);
    rangeStart.setMinutes(Math.ceil(rangeStart.getMinutes() / 30) * 30, 0, 0);

    const rangeEnd = new Date(now);
    rangeEnd.setDate(rangeEnd.getDate() + LOOK_AHEAD_DAYS);
    rangeEnd.setHours(23, 59, 59, 999);

    const freeBusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: rangeStart.toISOString(),
        timeMax: rangeEnd.toISOString(),
        timeZone: CALENDAR_TIME_ZONE,
        items: [{ id: 'primary' }],
      },
    });

    const busyPeriods = freeBusyRes.data.calendars?.primary?.busy ?? [];

    // Build list of busy intervals as timestamps
    const busyIntervals = busyPeriods.map((b) => ({
      start: new Date(b.start!).getTime(),
      end: new Date(b.end!).getTime(),
    }));

    const slots: TimeSlot[] = [];
    const cursor = new Date(rangeStart);

    while (cursor < rangeEnd && slots.length < 20) {
      const slotEnd = new Date(cursor.getTime() + SLOT_DURATION_MS);

      // Check working hours in Pacific Time using minutes-since-midnight to avoid
      // midnight wrap-around (endHour=0 would falsely pass an hour <= check).
      const startMinutes = getMinutesSinceMidnightInCalendarZone(cursor);
      const endMinutes = startMinutes + 30;

      const inWorkHours =
        startMinutes >= WORK_START_HOUR * 60 && endMinutes <= WORK_END_HOUR * 60;

      if (inWorkHours) {
        const slotStartMs = cursor.getTime();
        const slotEndMs = slotEnd.getTime();

        const overlaps = busyIntervals.some(
          (busy) => slotStartMs < busy.end && slotEndMs > busy.start
        );

        if (!overlaps) {
          slots.push({
            start: cursor.toISOString(),
            end: slotEnd.toISOString(),
            label: formatSlotLabel(cursor.toISOString()),
          });
        }
      }

      // Advance by 30 minutes
      cursor.setTime(cursor.getTime() + SLOT_DURATION_MS);
    }

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Calendar availability error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability. Calendar may not be connected.' },
      { status: 500 }
    );
  }
}
