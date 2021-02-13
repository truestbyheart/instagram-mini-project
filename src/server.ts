import { config } from 'dotenv';
import logger from './Config/logger.config';
import http from 'http';
import app from './app';

config();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => logger.info('App running on port: ' + PORT));
