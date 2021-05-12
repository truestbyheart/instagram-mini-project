import { NextFunction, Response, Request } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from '../../../Helper/statusCodes';
import { getCachedData } from '../../../Services/cache.service';

export const isUserCached = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { username },
    } = req;
    const data = await getCachedData(`${username}:profile`);
    if (data) {
      return res.status(OK).json({
        status: OK,
        data,
      });
    }

    return next();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: INTERNAL_SERVER_ERROR,
      message: 'App has failed to fetch profile from redis',
    });
  }
};
