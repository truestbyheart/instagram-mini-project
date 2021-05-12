import { Router } from 'express';
import postRouter from './Post';
import userRouter from './User';

const indexRouter = Router();

indexRouter.use('/post', postRouter);
indexRouter.use('/user', userRouter);

export default indexRouter;
