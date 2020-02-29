import {Router} from "express";
import LinkController from "../controller/link.Controller";

const linkRouter = Router();

linkRouter.post("/link", LinkController.getInstagramLink );

export default linkRouter;
