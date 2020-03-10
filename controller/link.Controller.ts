import cheerio from "cheerio";
import axios from "axios";
import {filterIgData} from "../helper/igPostDifference";


interface ILinks {
    img_urls: string;
    post_text: string;
}


class LinkController {
    getInstagramLink = async (req: any, res: any) => {
        const {body: {link}, query: {render: isToBeRendered}} = req;

        axios.get(link)
            .then(response => {
                const $ = cheerio.load(response.data);
                const graphQLString = $('body').find('script')[0].children[0].data;
                const graphQLJSON: string | undefined = graphQLString !== undefined ?
                    // @ts-ignore
                    graphQLString.match(/(?!window._sharedData) +(?!=).+(?=;)/g)[0]
                    : undefined;

                // @ts-ignore
                const g = JSON.parse(graphQLJSON);
                const mediaObject = g.entry_data.PostPage[0].graphql.shortcode_media;
                const filteredResult: any = filterIgData(mediaObject);

                isToBeRendered ?
                    res.render('index', {title: "Instr", url: link, data: filteredResult}) :
                    res.json(filteredResult);
            })
            .catch(error => {
                const errorMessage: string | any = {
                    message: "OOOPS..something went wrong",
                    error,
                    status: 400
                };
                res.json(errorMessage);
            })
    }
}


export default new LinkController();
