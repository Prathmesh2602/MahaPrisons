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
  return safeJsonFetch(`${API_BASE}/pages/${slug}`, {
    next: { revalidate: 60, tags: ['pages', `page-${slug}`] }
  });
}

export async function fetchMenu() {
  const data = await safeJsonFetch(`${API_BASE}/menu`, {
    next: { revalidate: 60, tags: ['menu'] }
  });
  return data && Array.isArray(data) && data.length > 0 ? data : (mockHomepageData.navigation_menu || []);
}

export async function fetchTranslations() {
  const data = await safeJsonFetch(`${API_BASE}/translations`, {
    next: { revalidate: 300, tags: ['translations'] }
  });
  return data && Object.keys(data).length > 0 ? data : defaultTranslations;
}

export async function fetchSettings() {
  const data = await safeJsonFetch(`${API_BASE}/settings`, {
    next: { revalidate: 300, tags: ['settings'] }
  });
  return data && Object.keys(data).length > 0 ? data : mockHomepageData;
}

export async function fetchAnnouncements(category?: string) {
  const url = category ? `${API_BASE}/announcements?category=${category}` : `${API_BASE}/announcements`;
  const data = await safeJsonFetch(url, {
    next: { revalidate: 60, tags: ['announcements'] }
  });
  return data && Array.isArray(data) ? data : [];
}

