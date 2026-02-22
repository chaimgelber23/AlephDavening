import { type ClassValue, clsx } from 'clsx';

// Lightweight cn() utility — no need for tailwind-merge for now
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
