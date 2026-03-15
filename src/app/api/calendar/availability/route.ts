import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getAuthenticatedClient } from '@/lib/googleTokens';

const SLOT_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const LOOK_AHEAD_DAYS = 3;
const WORK_START_HOUR = 11;  // 11 AM CT
const WORK_END_HOUR = 20;   // 8 PM CT

export interface TimeSlot {
  start: string;
  end: string;
  label: string;
}


function formatSlotLabel(startIso: string): string {
  const date = new Date(startIso);
  return date.toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
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
        timeZone: 'America/Chicago',
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

      // Check working hours in CT
      const ctHour = parseInt(
        cursor.toLocaleString('en-US', {
          timeZone: 'America/Chicago',
          hour: 'numeric',
          hour12: false,
        }),
        10
      );
      const ctEndHour = parseInt(
        slotEnd.toLocaleString('en-US', {
          timeZone: 'America/Chicago',
          hour: 'numeric',
          hour12: false,
        }),
        10
      );

      const inWorkHours =
        ctHour >= WORK_START_HOUR && ctEndHour <= WORK_END_HOUR;

      // Check weekday in CT
      const ctDay = cursor.toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        weekday: 'short',
      });
      const isWeekend = ctDay === 'Sat' || ctDay === 'Sun';

      if (inWorkHours && !isWeekend) {
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
