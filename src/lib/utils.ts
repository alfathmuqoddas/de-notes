import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Timestamp } from "firebase/firestore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRelativeTime = (
  firebaseTimestamp: Timestamp | undefined | null
): string => {
  if (!firebaseTimestamp || !firebaseTimestamp.toDate) {
    return "N/A";
  }

  const date = firebaseTimestamp.toDate();
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute ago
  if (seconds < 60) {
    return "just now";
  }

  // Minutes ago
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  // Hours ago
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  // Days ago (up to 7 days)
  const days = Math.floor(hours / 24);
  if (days <= 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  // Months ago (up to 11 months)
  // Approximate month calculation, more precise if needed would involve calendar math
  const months = Math.floor(days / 30); // Using 30 days as an average month
  if (months < 12) {
    // 11 months ago is less than 12 months
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  // Exact date for anything older than 11 months
  // You can customize the date format here
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
