const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1/public';

export async function fetchPage(slug: string) {
  const res = await fetch(`${API_BASE}/pages/${slug}`, {
    next: { revalidate: 60, tags: ['pages', `page-${slug}`] }
  });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchMenu() {
  const res = await fetch(`${API_BASE}/menu`, {
    next: { revalidate: 60, tags: ['menu'] }
  });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchTranslations() {
  const res = await fetch(`${API_BASE}/translations`, {
    next: { revalidate: 300, tags: ['translations'] }
  });
  if (!res.ok) return {};
  return res.json();
}

export async function fetchSettings() {
  const res = await fetch(`${API_BASE}/settings`, {
    next: { revalidate: 300, tags: ['settings'] }
  });
  if (!res.ok) return {};
  return res.json();
}

export async function fetchAnnouncements(category?: string) {
  const url = category ? `${API_BASE}/announcements?category=${category}` : `${API_BASE}/announcements`;
  const res = await fetch(url, {
    next: { revalidate: 60, tags: ['announcements'] }
  });
  if (!res.ok) return [];
  return res.json();
}
