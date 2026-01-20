// Helper function to get timezone abbreviation with custom mapping for common timezones
export function getTimezoneAbbr(date: Date, timezone: string): string {
  // Custom timezone mappings to show proper abbreviations instead of GMT offsets
  const timezoneMap: { [key: string]: string } = {
    'Asia/Kolkata': 'IST',
    'Asia/Calcutta': 'IST',
    'Asia/Mumbai': 'IST',
    'Asia/Delhi': 'IST',
    'Asia/Bangalore': 'IST',
    'Asia/Chennai': 'IST',
    'Asia/Hyderabad': 'IST',
    'America/New_York': 'EST',
    'America/Los_Angeles': 'PST',
    'America/Chicago': 'CST',
    'America/Denver': 'MST',
    'Europe/London': 'GMT',
    'Europe/Paris': 'CET',
    'Europe/Berlin': 'CET',
    'Asia/Tokyo': 'JST',
    'Asia/Shanghai': 'CST',
    'Asia/Hong_Kong': 'HKT',
    'Asia/Singapore': 'SGT',
    'Australia/Sydney': 'AEDT',
    'Australia/Melbourne': 'AEDT',
  };
  
  // Check if we have a custom mapping for this timezone
  if (timezoneMap[timezone]) {
    return timezoneMap[timezone];
  }
  
  // Fallback to the standard method for other timezones
  const parts = date.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ');
  return parts.length > 2 ? parts[2] : '';
}
