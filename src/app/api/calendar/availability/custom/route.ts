import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getAuthenticatedClient } from '@/lib/googleTokens';
import {
  CALENDAR_TIME_ZONE,
  SLOT_DURATION_MS,
  formatSlotLabel,
  getWorkWindowForDate,
  isWithinWorkHours,
  type TimeSlot,
} from '@/lib/calendarTime';

const MAX_SLOTS = 20;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datesParam = searchParams.get('dates');

    if (!datesParam) {
      return NextResponse.json({ error: 'dates parameter is required' }, { status: 400 });
    }

    const dates = datesParam.split(',').map((d) => d.trim()).filter(Boolean);
    if (dates.length === 0) {
      return NextResponse.json({ error: 'At least one date is required' }, { status: 400 });
    }

    const auth = await getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const windows = dates
      .map(getWorkWindowForDate)
      .filter((w): w is NonNullable<typeof w> => w !== null);

    if (windows.length === 0) {
      return NextResponse.json({ error: 'No valid dates provided' }, { status: 400 });
    }

    const queryStart = new Date(Math.min(...windows.map((w) => w.windowStart.getTime())));
    const queryEnd = new Date(Math.max(...windows.map((w) => w.windowEnd.getTime())));

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
      const cursor = new Date(window.windowStart);

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
    console.error('Custom availability error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability. Calendar may not be connected.' },
      { status: 500 }
    );
  }
}
