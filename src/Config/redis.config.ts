import redis from 'redis';
import { REDIS_URL } from './app.config';
import logger from './logger.config';

const cache = redis.createClient({ url: REDIS_URL });

cache.on('connect', () => logger.info('Redis connection established'));
cache.on('error', () => logger.error('Redis connection not established'));

export default cache;
