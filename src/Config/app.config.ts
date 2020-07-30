import dotenv from 'dotenv';

dotenv.config();

const path =
  process.env.NODE_ENV === 'development' ? `${__dirname}/../.env.development` : `${__dirname}/../.env.production`;

dotenv.config({ path });

export const TOKEN_KEY: any = process.env.TOKEN_KEY;
export const HEADLESS_STATUS: any = process.env.HEADLESS_STATUS;
