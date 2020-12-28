import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from '../../Helper/statusCodes';
import { puppeteerService } from '../../Helper/puppeteer.service';
import cheerio from 'cheerio';
import { filterIgData } from '../../Helper/igPostDifference';

class PostController {
  async getInstagramPost(req: Request, res: Response): Promise<void> {
    try {
      const {
        body: { link },
      } = req;

      // Setting up puppeteer and loading the html to cheerio
      const { page, browser } = await puppeteerService.startBrowser();
      await page.goto(link);
      const html = await page.content();
      const $ = cheerio.load(html);

      // retrieving the graphQL data.
      const graphQLString = $('body').find('script')[0].children[0].data;
      const graphQLJSON =
        graphQLString !== undefined
          ? JSON.parse(graphQLString.split('window._sharedData =')[1].replace(';', ''))
          : null;
      const mediaObject = graphQLJSON.entry_data.PostPage[0].graphql.shortcode_media;
      const filteredResult: any = filterIgData(mediaObject);

      //close the browser
      await puppeteerService.closeBrowser(browser);

      // sorting through the JSON object
      res.status(OK).json({
        status: OK,
        data: filteredResult,
      });
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }
}

export const postController = new PostController();
