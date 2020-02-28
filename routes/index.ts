import  { Router} from "express";

const HomeRouter = Router();

/* GET home page. */
HomeRouter.get('/', (req:any, res:any) => {
  res.render('index', { title: 'Express' });
});

export default HomeRouter;
