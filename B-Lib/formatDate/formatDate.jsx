// Function to format date in abbreviated format
const formatDate = (dateString) => {
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
  