import cache from '../Config/redis.config';

export const cacheData = (key: string, data: string, expiration: number | null = null): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    if (!expiration) {
      cache.set(key, data, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    } else {
      cache.setex(key, expiration, data, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    }
  });

export const getCachedData = (key: string): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    cache.get(key, (err, data: string | null) => {
      if (err) reject(err);
      resolve(JSON.parse(data as string));
    });
  });
