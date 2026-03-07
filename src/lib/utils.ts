import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a string to a URL-friendly slug
 * Example: "Pic 1" -> "pic-1"
 */
export function createSlug(input: string): string {
  if (!input?.trim()) return '';

  let text = input
    .normalize('NFD') // decompose diacritics ( café → café )
    .replace(/[\u0300-\u036f]/g, '') // remove combining diacritical marks
    .toLowerCase()
    .trim();

  // Replace known special characters with meaningful words or remove
  text = text
    .replace(/\+/g, '-plus')
    .replace(/\&/g, '-and')
    .replace(/[@#]/g, '')
    .replace(/[?!]/g, '')
    .replace(/[^a-z0-9\- ]/gi, ''); // keep only alphanumeric + hyphen + space

  return text
    .replace(/\s+/g, '-') // spaces → hyphen
    .replace(/-+/g, '-') // collapse multiple hyphens
    .replace(/^-+|-+$/g, ''); // trim hyphens from ends
}

/**
 * Find a portfolio item by its slug
 */
export function findItemBySlug<T extends { title: string }>(
  items: T[],
  slug: string
): T | undefined {
  return items.find((item) => createSlug(item.title) === slug);
}
