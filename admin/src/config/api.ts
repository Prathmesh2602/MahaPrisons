export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || (import.meta.env.DEV ? 'http://localhost:3000' : 'CONFIGURATION_ERROR_MISSING_VITE_FRONTEND_URL');
