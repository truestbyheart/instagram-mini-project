import { Router } from 'express';
import { postController } from './post.controller';

const postRouter = Router();

postRouter.post('link', postController.getInstagramPost);

export default postRouter;
