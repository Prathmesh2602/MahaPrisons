import { API_URL } from './apiConfig';

export const getImageUrl = (url) => {
  if (!url) return '';
  
  if (url.startsWith('https://')) return url;
  if (url.startsWith('http://')) return url;

  const baseUrl = API_URL;
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${cleanBase}${cleanUrl}`;
};