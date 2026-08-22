import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getAuthenticatedClient } from '@/lib/googleTokens';
import {
  CALENDAR_TIME_ZONE,
  SLOT_DURATION_MS,
  addCalendarDays,
  formatSlotLabel,
  getDateInCalendarZone,
  getWorkWindowForDate,
  isWithinWorkHours,
  type TimeSlot,
} from '@/lib/calendarConfig';

const LOOK_AHEAD_DAYS = 3;
const MAX_SLOTS = 20;
const MIN_LEAD_MS = 60 * 60 * 1000;

export type { TimeSlot };

export async function GET() {
  try {
    const auth = await getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const now = new Date();
    const minStart = new Date(now.getTime() + MIN_LEAD_MS);
    const todayInZone = getDateInCalendarZone(now);
    const dates = Array.from({ length: LOOK_AHEAD_DAYS + 1 }, (_, i) =>
      addCalendarDays(todayInZone, i)
    );

    const windows = dates
      .map(getWorkWindowForDate)
      .filter((w): w is NonNullable<typeof w> => w !== null);

    if (windows.length === 0) {
      return NextResponse.json({ slots: [] });
    }

    const queryStart = new Date(
      Math.max(minStart.getTime(), windows[0].windowStart.getTime())
    );
    const queryEnd = windows[windows.length - 1].windowEnd;

    if (queryStart >= queryEnd) {
      return NextResponse.json({ slots: [] });
    }

    const freeBusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: queryStart.toISOString(),
        timeMax: queryEnd.toISOString(),
        timeZone: CALENDAR_TIME_ZONE,
        items: [{ id: 'primary' }],
      },
    });

    const busyPeriods = freeBusyRes.data.calendars?.primary?.busy ?? [];
    const busyIntervals = busyPeriods.map((b) => ({
      start: new Date(b.start!).getTime(),
      end: new Date(b.end!).getTime(),
    }));

    const slots: TimeSlot[] = [];

    for (const window of windows) {
      if (slots.length >= MAX_SLOTS) break;

      const cursor = new Date(
        Math.max(window.windowStart.getTime(), minStart.getTime())
      );
      const leftover = cursor.getTime() % SLOT_DURATION_MS;
      if (leftover !== 0) {
        cursor.setTime(cursor.getTime() + (SLOT_DURATION_MS - leftover));
      }

      while (cursor < window.windowEnd && slots.length < MAX_SLOTS) {
        const slotEnd = new Date(cursor.getTime() + SLOT_DURATION_MS);
        if (slotEnd > window.windowEnd) break;

        if (isWithinWorkHours(cursor)) {
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

        cursor.setTime(cursor.getTime() + SLOT_DURATION_MS);
      }
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
