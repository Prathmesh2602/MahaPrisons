import { mockHomepageData } from '../data/mockData';
import { translations as defaultTranslations } from '../data/translations';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1/public';

async function safeJsonFetch(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null;
    }
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchPage(slug: string) {
  // Mock page implementation since backend is disabled
  return null;
}

export async function fetchMenu() {
  return mockHomepageData.navigation_menu || [];
}

export async function fetchTranslations() {
  return defaultTranslations;
}

export async function fetchSettings() {
  return mockHomepageData;
}

export async function fetchAnnouncements(category?: string) {
  return [];
}

