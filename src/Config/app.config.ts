import dotenv from 'dotenv';
import path from 'path';

const environment = process.env.NODE_ENV?.trim() || 'development';

const dir =
  environment === 'development' ? path.join(__dirname, '../../.env.development') : path.join(__dirname, '../../.env');

const result = dotenv.config({ path: dir });

export const TOKEN_KEY: any = process.env.TOKEN_KEY;
export const HEADLESS_STATUS: any = process.env.HEADLESS_STATUS;
