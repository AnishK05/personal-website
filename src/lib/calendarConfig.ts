export const CALENDAR_TIME_ZONE = 'America/Chicago';
export const CALENDAR_TIME_ZONE_LABEL = 'Central Time';
export const DISPLAY_TIME_ZONE_SUFFIX = 'CT';

export const SLOT_DURATION_MS = 30 * 60 * 1000;
export const WORK_START_HOUR = 9; // 9 AM CT
export const WORK_END_HOUR = 21; // 9 PM CT

export interface TimeSlot {
  start: string;
  end: string;
  label: string;
}

interface LocalDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute?: number;
}

/** Calendar date (YYYY-MM-DD) for an instant in the scheduling timezone. */
export function getDateInCalendarZone(date: Date = new Date()): string {
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
  const date = new Date(startIso);
  const label = date.toLocaleString('en-US', {
    timeZone: CALENDAR_TIME_ZONE,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${label} ${DISPLAY_TIME_ZONE_SUFFIX}`;
}

export function getMinutesSinceMidnightInCalendarZone(date: Date): number {
  const timeParts = new Intl.DateTimeFormat('en-US', {
    timeZone: CALENDAR_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const hour = Number(timeParts.find(part => part.type === 'hour')?.value ?? '0');
  const minute = Number(timeParts.find(part => part.type === 'minute')?.value ?? '0');

  return hour * 60 + minute;
}

export function isWithinWorkHours(slotStart: Date): boolean {
  const startMinutes = getMinutesSinceMidnightInCalendarZone(slotStart);
  const endMinutes = startMinutes + 30;
  return startMinutes >= WORK_START_HOUR * 60 && endMinutes <= WORK_END_HOUR * 60;
}

export function getWorkWindowForDate(dateStr: string): { windowStart: Date; windowEnd: Date } | null {
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return null;

  const windowStart = localCalendarTimeToUtc({ year, month, day, hour: WORK_START_HOUR });
  const windowEnd = localCalendarTimeToUtc({ year, month, day, hour: WORK_END_HOUR });

  return { windowStart, windowEnd };
}

function localCalendarTimeToUtc(localDateTime: LocalDateTime): Date {
  const { year, month, day, hour, minute = 0 } = localDateTime;
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));
  const firstPass = new Date(utcGuess.getTime() - getTimeZoneOffsetMs(utcGuess));

  return new Date(utcGuess.getTime() - getTimeZoneOffsetMs(firstPass));
}

function getTimeZoneOffsetMs(date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CALENDAR_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const partValue = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find(part => part.type === type)?.value ?? '0');

  const zonedTimestamp = Date.UTC(
    partValue('year'),
    partValue('month') - 1,
    partValue('day'),
    partValue('hour'),
    partValue('minute'),
    partValue('second')
  );

  return zonedTimestamp - date.getTime();
}
