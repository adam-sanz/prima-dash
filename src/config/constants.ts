/**
 * Application-wide constants and configuration values
 */

import { env } from './env';

export const API_CONFIG = {
  BASE_URL: env.API_BASE_URL,
  ENDPOINTS: {
    USERS: '/users',
  },
  TIMEOUT: 10000,
} as const;

export const APP_CONFIG = {
  NAME: env.APP_NAME,
  VERSION: env.APP_VERSION,
} as const;
