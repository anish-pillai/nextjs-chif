'use client';

import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface TimeDisplayProps {
  timestamp: number;
  format?: string;
  className?: string;
}

// Helper function to get timezone abbreviation
function getTimezoneAbbr(date: Date): string {
  return date.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2];
}

export function TimeDisplay({ timestamp, format: formatStr = 'p', className }: TimeDisplayProps) {
  // Get browser's timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Convert UTC timestamp to browser's local time
  const utcDate = new Date(timestamp * 1000);
  const localDate = toZonedTime(utcDate, timezone);
  
  // Get timezone abbreviation
  const tzAbbr = getTimezoneAbbr(localDate);
  
  return (
    <time dateTime={utcDate.toISOString()} className={className}>
      {format(localDate, formatStr)} {tzAbbr}
    </time>
  );
}

export function DateDisplay({ timestamp, format: formatStr = 'PPP', className }: TimeDisplayProps) {
  // Get browser's timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Convert UTC timestamp to browser's local time
  const utcDate = new Date(timestamp * 1000);
  const localDate = toZonedTime(utcDate, timezone);
  
  return (
    <time dateTime={utcDate.toISOString()} className={className}>
      {format(localDate, formatStr)}
    </time>
  );
}

export function DateTimeDisplay({ timestamp, format: formatStr = 'PPp', className }: TimeDisplayProps) {
  // Get browser's timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Convert UTC timestamp to browser's local time
  const utcDate = new Date(timestamp * 1000);
  const localDate = toZonedTime(utcDate, timezone);
  
  // Get timezone abbreviation
  const tzAbbr = getTimezoneAbbr(localDate);
  
  return (
    <time dateTime={utcDate.toISOString()} className={className}>
      {format(localDate, formatStr)} {tzAbbr}
    </time>
  );
}
