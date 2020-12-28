import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from '../../Helper/statusCodes';
import { IProfileDetail, userProfile } from './helper/user.profile';

class UserController {
  async getUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const {
        params: { username },
      } = req;
      const profileData: IProfileDetail = await userProfile.getProfileData(username);
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
}

export const userController = new UserController();
