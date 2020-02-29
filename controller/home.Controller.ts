
class HomeController{
    renderHomePage = (req: any, res:any) => {
        res.render('index', { title: 'Instr' });
    }
}

export default new HomeController();
