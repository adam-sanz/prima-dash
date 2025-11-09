/**
 * Environment configuration
 */
export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Prima User Dashboard',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
} as const;

export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
