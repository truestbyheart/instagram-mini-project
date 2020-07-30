import { Router } from 'express';
import postRouter from './Post';

const indexRouter = Router();

indexRouter.use('/post', postRouter);

export default indexRouter;
