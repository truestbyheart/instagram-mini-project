import dotenv from 'dotenv';
import path from 'path';

const environment = process.env.NODE_ENV?.trim() || 'development';

const dir =
  environment === 'development' ? path.join(__dirname, '../../.env.development') : path.join(__dirname, '../../.env');

const result = dotenv.config({ path: dir });

export const { TOKEN_KEY, HEADLESS_STATUS, MONGO_URL, PORT }: any = process.env;
