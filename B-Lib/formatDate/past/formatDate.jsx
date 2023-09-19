// Example > 2 months ago
// Function to format date in abbreviated format
export const formatDate = (dateString) => {
  const now = new Date();
  const updatedAt = new Date(dateString);
  const timeDifference = now - updatedAt;

  // Time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;

  // Calculate time difference in minutes, hours, days, and months
  const minutes = Math.floor(timeDifference / minute);
  const hours = Math.floor(timeDifference / hour);
  const days = Math.floor(timeDifference / day);
  const months = Math.floor(timeDifference / month);

  // Return formatted date string
  if (months > 0) {
    return `updated ${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else if (days > 0) {
    return `updated ${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (hours > 0) {
    return `updated ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `updated ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
};
  
// Example > November 9, 2021
export function formatDateFull(inputDate) {
  // Create a Date object from the input string
  const date = new Date(inputDate);

  // Define an array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get the year, month, and day from the Date object
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  // Format the date as "Month Day, Year"
  const formattedDate = `${monthNames[month]} ${day}, ${year}`;

  return formattedDate;
}

// Usage
const inputDate = "2023-08-13T10:48:01.523Z";
const formattedDate = formatDateFull(inputDate);
console.log(formattedDate); // Output: "August 13, 2023"