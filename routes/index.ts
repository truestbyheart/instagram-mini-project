import { Router} from "express";
import HomeRouter from "./home.router";
import linkRouter from "./link.router";

const rootRouter = Router();

rootRouter.use("/", HomeRouter);
rootRouter.use("/", linkRouter);

export default rootRouter;
