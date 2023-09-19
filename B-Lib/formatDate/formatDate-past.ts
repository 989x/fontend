// In this section of code, there are too many if and else if statements,
// I don't know if this will make the code run slower.

// Or is there a better way? You can customize the code.

import { useDictionary } from "@/lib/dictionary";

export function formatDate(dateString: string): string {
  const t = useDictionary();

  const now = new Date();
  const updatedAt = new Date(dateString);
  const timeDifference = now.getTime() - updatedAt.getTime();

  // Time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day; // Approximating a year as 365 days

  // Calculate time difference in minutes, hours, days, months, and years
  const minutes = Math.floor(timeDifference / minute);
  const hours = Math.floor(timeDifference / hour);
  const days = Math.floor(timeDifference / day);
  const months = Math.floor(timeDifference / month);
  const years = Math.floor(timeDifference / year);

  // Return formatted date string using translations and conditions
  if (years === 1) {
    return `${years} ${t.FormatDateTime5}${t.FormatDateTimeAgo}`;
  } else if (years > 1) {
    return `${years} ${t.FormatDateTime5}${t.FormatDateTimeS}${t.FormatDateTimeAgo}`;
  } else if (months === 1) {
    return `${months} ${t.FormatDateTime4}${t.FormatDateTimeAgo}`;
  } else if (months > 1) {
    return `${months} ${t.FormatDateTime4}${t.FormatDateTimeS}${t.FormatDateTimeAgo}`;
  } else if (days === 1) {
    return `${days} ${t.FormatDateTime3}${t.FormatDateTimeAgo}`;
  } else if (days > 1) {
    return `${days} ${t.FormatDateTime3}${t.FormatDateTimeS}${t.FormatDateTimeAgo}`;
  } else if (hours === 1) {
    return `${hours} ${t.FormatDateTime2}${t.FormatDateTimeAgo}`;
  } else if (hours > 1) {
    return `${hours} ${t.FormatDateTime2}${t.FormatDateTimeS}${t.FormatDateTimeAgo}`;
  } else if (minutes === 1) {
    return `${minutes} ${t.FormatDateTime1}${t.FormatDateTimeAgo}`;
  } else if (minutes > 1) {
    return `${minutes} ${t.FormatDateTime1}${t.FormatDateTimeS}${t.FormatDateTimeAgo}`;
  } else {
    return `${t.FormatDateNow}`;
  }
}