import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.get('/:username', userController.getUserInfo);

export default userRouter;
