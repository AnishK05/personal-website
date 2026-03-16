import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getAuthenticatedClient } from '@/lib/googleTokens';

const SLOT_DURATION_MS = 30 * 60 * 1000;
const WORK_START_HOUR = 11; // 11 AM CT
const WORK_END_HOUR = 20;   // 8 PM CT

interface TimeSlot {
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

// Given a YYYY-MM-DD string, return the start/end of the work window in CT
function getWorkWindowForDate(dateStr: string): { windowStart: Date; windowEnd: Date } | null {
  // Parse the date as a CT date by constructing an ISO string with CT offset
  // We build the window start/end in CT, then convert to UTC for the API
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return null;

  // Determine the CT UTC offset for this specific date (accounts for DST)
  // by querying what CT time corresponds to 18:00 UTC on that day.
  const ctFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Use a reference UTC date at 18:00 UTC on that day to determine the CT offset
  const refUtc = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T18:00:00Z`);
  const ctParts = ctFormatter.formatToParts(refUtc);
  const ctHour = Number(ctParts.find(p => p.type === 'hour')?.value ?? '0');
  // offset = utcHour - ctHour (hours), e.g. CST=UTC-6 → 18-12=6, CDT=UTC-5 → 18-13=5
  const refUtcHour = 18;
  const offsetHours = refUtcHour - (ctHour === 24 ? 0 : ctHour);

  // Build window start/end in UTC
  const windowStart = new Date(Date.UTC(year, month - 1, day, WORK_START_HOUR + offsetHours, 0, 0, 0));
  const windowEnd   = new Date(Date.UTC(year, month - 1, day, WORK_END_HOUR   + offsetHours, 0, 0, 0));

  return { windowStart, windowEnd };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datesParam = searchParams.get('dates');

    if (!datesParam) {
      return NextResponse.json({ error: 'dates parameter is required' }, { status: 400 });
    }

    const dates = datesParam.split(',').map(d => d.trim()).filter(Boolean);
    if (dates.length === 0) {
      return NextResponse.json({ error: 'At least one date is required' }, { status: 400 });
    }

    const auth = await getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });

    // Build the overall query window spanning all requested dates
    const windows = dates
      .map(getWorkWindowForDate)
      .filter((w): w is NonNullable<typeof w> => w !== null);

    if (windows.length === 0) {
      return NextResponse.json({ error: 'No valid dates provided' }, { status: 400 });
    }

    const queryStart = new Date(Math.min(...windows.map(w => w.windowStart.getTime())));
    const queryEnd   = new Date(Math.max(...windows.map(w => w.windowEnd.getTime())));

    const freeBusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: queryStart.toISOString(),
        timeMax: queryEnd.toISOString(),
        timeZone: 'America/Chicago',
        items: [{ id: 'primary' }],
      },
    });

    const busyPeriods = freeBusyRes.data.calendars?.primary?.busy ?? [];
    const busyIntervals = busyPeriods.map(b => ({
      start: new Date(b.start!).getTime(),
      end:   new Date(b.end!).getTime(),
    }));

    const slots: TimeSlot[] = [];

    for (const window of windows) {
      const cursor = new Date(window.windowStart);

      while (cursor < window.windowEnd && slots.length < 20) {
        const slotEnd = new Date(cursor.getTime() + SLOT_DURATION_MS);
        if (slotEnd > window.windowEnd) break;

        // Verify working hours in CT (guards against DST edge cases)
        const ctStartStr = cursor.toLocaleString('en-US', {
          timeZone: 'America/Chicago',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        const [startH, startM] = ctStartStr.split(':').map(Number);
        const startMinutes = startH * 60 + startM;
        const endMinutes   = startMinutes + 30;

        const inWorkHours =
          startMinutes >= WORK_START_HOUR * 60 && endMinutes <= WORK_END_HOUR * 60;

        if (inWorkHours) {
          const slotStartMs = cursor.getTime();
          const slotEndMs   = slotEnd.getTime();

          const overlaps = busyIntervals.some(
            busy => slotStartMs < busy.end && slotEndMs > busy.start
          );

          if (!overlaps) {
            slots.push({
              start: cursor.toISOString(),
              end:   slotEnd.toISOString(),
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
