export const createDateString = (dateString: string): string => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const date = new Date(dateString);
  const now = new Date();
  const delta = now.getTime() - date.getTime();
  if (delta < MINUTE) return "Now";
  else if (delta < 2 * MINUTE)
    return `${Math.floor(delta / MINUTE)} minute ago`;
  else if (delta < HOUR) return `${Math.floor(delta / MINUTE)} minutes ago`;
  else if (delta < 2 * HOUR) return `${Math.floor(delta / HOUR)} hour ago`;
  else if (delta < DAY) return `${Math.floor(delta / HOUR)} hours ago`;
  else return date.toLocaleDateString("en-GB");
};
