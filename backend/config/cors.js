import { config } from './env.js';

export const corsConfig = {
  origin: config.CORS_ORIGIN.split(',').map(s => s.trim()),
  credentials: true,
};
