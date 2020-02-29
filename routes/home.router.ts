import  { Router} from "express";
import HomeController from "../controller/home.Controller";

const HomeRouter = Router();

/* GET home page. */
HomeRouter.get('/', HomeController.renderHomePage);

export default HomeRouter;
