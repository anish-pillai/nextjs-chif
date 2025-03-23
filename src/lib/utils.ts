import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, fromUnixTime } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert any date input to Unix timestamp in seconds
export function toUnixTimestamp(date: string | Date | number): number {
  if (typeof date === 'number') {
    // If it's already a timestamp in milliseconds, convert to seconds
    return Math.floor(date / 1000);
  }
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return Math.floor(dateObj.getTime() / 1000);
}

// Format Unix timestamp (in seconds) as date
export function formatDate(timestamp: number) {
  return format(fromUnixTime(timestamp), 'PPP'); // e.g., "April 29th, 2023"
}

// Format Unix timestamp (in seconds) as time
export function formatTime(timestamp: number) {
  return format(fromUnixTime(timestamp), 'p'); // e.g., "12:00 PM"
}

// Format Unix timestamp (in seconds) as date and time
export function formatDateTime(timestamp: number) {
  return format(fromUnixTime(timestamp), 'PPp'); // e.g., "April 29th, 2023 at 12:00 PM"
}

// Format Unix timestamp (in seconds) for datetime-local input
export function formatDateTimeForInput(timestamp: number) {
  return format(fromUnixTime(timestamp), "yyyy-MM-dd'T'HH:mm"); // e.g., "2023-04-29T12:00"
}

// Get current Unix timestamp in seconds
export function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}