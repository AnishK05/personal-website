export const CALENDAR_TIME_ZONE = 'America/Chicago';

export const WORK_START_HOUR = 9; // 9 AM CT
export const WORK_END_HOUR = 21; // 9 PM CT
export const SLOT_DURATION_MS = 30 * 60 * 1000;

export interface TimeSlot {
  start: string;
  end: string;
  label: string;
}

/** Calendar date (YYYY-MM-DD) for an instant in Central Time. */
export function getDateInCentralTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: CALENDAR_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function addCalendarDays(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + days));
  return next.toISOString().slice(0, 10);
}

export function formatSlotLabel(startIso: string): string {
  return new Date(startIso).toLocaleString('en-US', {
    timeZone: CALENDAR_TIME_ZONE,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });
}

/**
 * 9 AM–9 PM Central window for a YYYY-MM-DD date.
 * Offset is derived from America/Chicago so DST is handled.
 */
export function getWorkWindowForDate(
  dateStr: string
): { windowStart: Date; windowEnd: Date } | null {
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return null;

  const ctFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: CALENDAR_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // 18:00 UTC is always the same calendar day in Chicago (noon CST / 1 PM CDT)
  const refUtc = new Date(
    `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T18:00:00Z`
  );
  const ctParts = ctFormatter.formatToParts(refUtc);
  const ctHour = Number(ctParts.find((p) => p.type === 'hour')?.value ?? '0');
  const refUtcHour = 18;
  const offsetHours = refUtcHour - (ctHour === 24 ? 0 : ctHour);

  const windowStart = new Date(
    Date.UTC(year, month - 1, day, WORK_START_HOUR + offsetHours, 0, 0, 0)
  );
  const windowEnd = new Date(
    Date.UTC(year, month - 1, day, WORK_END_HOUR + offsetHours, 0, 0, 0)
  );

  return { windowStart, windowEnd };
}

export function isWithinWorkHours(slotStart: Date): boolean {
  const ctStartStr = slotStart.toLocaleString('en-US', {
    timeZone: CALENDAR_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const [startH, startM] = ctStartStr.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = startMinutes + 30;

  return startMinutes >= WORK_START_HOUR * 60 && endMinutes <= WORK_END_HOUR * 60;
}
