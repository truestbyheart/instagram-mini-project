import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from '../../Helper/statusCodes';

class PostController {
  async getInstagramPost(req: Request, res: Response): Promise<void> {
    try {
      const {
        body: { link },
      } = req;
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }
}

export const postController = new PostController();
