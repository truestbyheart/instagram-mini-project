import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from '../../Helper/statusCodes';
import { IProfileDetail, userProfile } from './helper/user.profile';
import { cacheData } from '../../Services/cache.service';

class UserController {
  async getUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const {
        params: { username },
      } = req;
      const profileData: IProfileDetail = await userProfile.getProfileData(username);
      await cacheData(`${username}:profile`, JSON.stringify(profileData), 3600);
      res.status(OK).json({
        status: OK,
        data: profileData,
      });
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: 'something went wrong',
      });
    }
  }

  async getUserFollowers(req: Request, res: Response): Promise<void> {
    try {
      const {
        params: { username },
      } = req;

      await userProfile.getFollowers(username);

      res.send({});
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: 'Failured to get followers',
      });
    }
  }
}

export const userController = new UserController();
