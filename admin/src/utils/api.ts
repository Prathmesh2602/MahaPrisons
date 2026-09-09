export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${endpoint.startsWith('/api/v1/admin') ? endpoint.replace('/api/v1/admin', '') : endpoint.replace('/api/v1', '')}`;
  // Wait, actually, let's just make it simple:
  // if it starts with http, use it. otherwise append to localhost:5000
  const finalUrl = endpoint.startsWith('http') ? endpoint : `http://localhost:5000${endpoint}`;

  try {
    const response = await fetch(finalUrl, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      window.dispatchEvent(new Event('auth:unauthorized'));
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
};
