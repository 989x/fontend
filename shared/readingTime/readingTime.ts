// utils/readingTime.ts

export function calculateReadingTime(content: string): string {
    // Average reading speed in words per minute (adjust as needed)
    const wordsPerMinute = 200;
  
    // Count the number of words in the content
    const wordCount = content.split(/\s+/).length;
  
    // Calculate the reading time in minutes
    const readingTimeInMinutes = Math.ceil(wordCount / wordsPerMinute);
  
    // Format the reading time as "X min" or "X mins" based on the value
    if (readingTimeInMinutes === 1) {
      return '1 min read';
    } else {
      return `${readingTimeInMinutes} mins read`;
    }
  }
  