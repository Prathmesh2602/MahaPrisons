export const API_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://13-204-230-95.sslip.io');
