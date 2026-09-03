const API_BASE = 'http://localhost:5000/api/v1/admin';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Dispatch event to force logout
      window.dispatchEvent(new Event('auth:unauthorized'));
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Client Error [${endpoint}]:`, error);
    throw error;
  }
};
