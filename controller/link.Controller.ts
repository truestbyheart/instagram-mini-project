import cheerio from "cheerio";
import axios from "axios";


interface ILinks {
    img_urls: string;
    post_text: string;
}


class LinkController {
    getInstagramLink = async (req: any, res: any) => {
        const {body: {link}} = req;

        axios.get(link)
            .then(response => {
                const $ = cheerio.load(response.data);
                const graphQLString = $('body').find('script')[0].children[0].data;
                const graphQLJSON: string | undefined = graphQLString !== undefined ?
                    // @ts-ignore
                    graphQLString.match(/(?!window._sharedData) +(?!=).+(?=;)/g)[0]
                    : undefined;

                // @ts-ignore
                const  g = JSON.parse(graphQLJSON);

                res.json(g.entry_data);
            })
            .catch(error => {
                const errorMessage = {
                    message: "OOOPS..something went wrong",
                    error,
                    status: 400
                };
                res.json(errorMessage);
            })
    }
}


export default new LinkController();
