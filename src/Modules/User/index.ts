import { Router } from 'express';
import { userController } from './user.controller';
import { isUserCached } from './middleware/cache.middleware';

const userRouter = Router();

userRouter.get('/:username', isUserCached, userController.getUserInfo);
userRouter.get('/followers/:username', userController.getUserFollowers);

export default userRouter;
