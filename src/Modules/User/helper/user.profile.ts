import cheerio from 'cheerio';
import { PuppeteerService } from '../../../Helper/puppeteer.service';

export interface IProfileDetail {
  username: string;
  full_name: string;
  followers: string;
  following: string;
  is_business_account: string;
  business_category_name: string;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  biography: string;
}

class UserProfile extends PuppeteerService {
  async getProfileData(handle: string): Promise<IProfileDetail> {
    const { page, browser } = await this.startBrowser();

    // navigate to profile
    await page.goto(`https://www.instagram.com/${handle}/`);
    // await page.setRequestInterception(true);
    // page.on('request', (req) => {
    //   if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
    //     req.abort();
    //   }
    //   req.continue();
    // });
    const html = await page.content();
    const $ = cheerio.load(html);

    // process page data
    const sharedData = $('body').find('body > script')[0].children[0].data;
    const profileJSON =
      sharedData !== undefined ? JSON.parse(sharedData.split('window._sharedData =')[1].replace(';', '')) : null;
    const {
      biography,
      full_name,
      edge_followed_by: { count: followers },
      edge_follow: { count: following },
      is_business_account,
      business_category_name,
      profile_pic_url,
      profile_pic_url_hd,
      username,
    } = profileJSON.entry_data.ProfilePage[0].graphql.user;

    // close the browser
    await this.closeBrowser(browser);

    // return profile data
    return {
      biography,
      full_name,
      followers,
      following,
      is_business_account,
      business_category_name,
      profile_pic_url,
      profile_pic_url_hd,
      username,
    };
  }
}

export const userProfile = new UserProfile();
