'use client';

import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useState, useEffect } from 'react';
import { getTimezoneAbbr } from '@/lib/timezone';

interface TimeDisplayProps {
  timestamp: number;
  format?: string;
  className?: string;
}

export function TimeDisplay({ timestamp, format: formatStr = 'p', className }: TimeDisplayProps) {
  const [timezone, setTimezone] = useState<string>('UTC');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);
  
  // Convert UTC timestamp to browser's local time
  const utcDate = new Date(timestamp * 1000);
  const localDate = isClient ? toZonedTime(utcDate, timezone) : utcDate;
  
  // Get timezone abbreviation only on client
  const tzAbbr = isClient ? getTimezoneAbbr(localDate, timezone) : '';
  
  return (
    <time dateTime={utcDate.toISOString()} className={className}>
      {format(localDate, formatStr)}{tzAbbr && ` ${tzAbbr}`}
    </time>
  );
}

export function DateDisplay({ timestamp, format: formatStr = 'PPP', className }: TimeDisplayProps) {
  const [timezone, setTimezone] = useState<string>('UTC');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);
  
  // Convert UTC timestamp to browser's local time
  const utcDate = new Date(timestamp * 1000);
  const localDate = isClient ? toZonedTime(utcDate, timezone) : utcDate;
  
  return (
    <time dateTime={utcDate.toISOString()} className={className}>
      {format(localDate, formatStr)}
    </time>
  );
}

export function DateTimeDisplay({ timestamp, format: formatStr = 'PPp', className }: TimeDisplayProps) {
  const [timezone, setTimezone] = useState<string>('UTC');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);
  
  // Convert UTC timestamp to browser's local time
  const utcDate = new Date(timestamp * 1000);
  const localDate = isClient ? toZonedTime(utcDate, timezone) : utcDate;
  
  // Get timezone abbreviation only on client
  const tzAbbr = isClient ? getTimezoneAbbr(localDate, timezone) : '';
  
  return (
    <time dateTime={utcDate.toISOString()} className={className}>
      {format(localDate, formatStr)}{tzAbbr && ` ${tzAbbr}`}
    </time>
  );
}
