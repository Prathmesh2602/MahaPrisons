export const API_URL = import.meta.env.VITE_API_URL || 'https://13-204-230-95.sslip.io';

export const FRONTEND_URL = 
  import.meta.env.VITE_FRONTEND_URL || 
  (typeof window !== 'undefined' && window.location.hostname.startsWith('admin.')
    ? `${window.location.protocol}//${window.location.hostname.replace(/^admin\./, 'web.')}`
    : (import.meta.env.DEV ? 'http://localhost:3000' : 'https://web.13-204-230-95.sslip.io'));

export const resolvePreviewUrl = (url?: string | null): string => {
  if (!url) return '';

  if (url.startsWith('/login?preview=true')) {
    return `${window.location.origin}${url}`;
  }
  if (url.startsWith('/')) {
    return `${FRONTEND_URL}${url}`;
  }

  // If running in production (not on localhost/127.0.0.1) and url points to localhost
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    if (url.includes('localhost:3000')) {
      return url.replace(/^https?:\/\/localhost:3000/, FRONTEND_URL);
    }
    if (url.includes('localhost:5173')) {
      return url.replace(/^https?:\/\/localhost:5173/, window.location.origin);
    }
  }

  return url;
};
