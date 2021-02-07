import cheerio from 'cheerio';
import { PuppeteerService } from '../../../Services/puppeteer.service';

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
  blocked_by_viewer: boolean;
  follows_viewer: boolean;
  is_private: boolean;
  is_verified: boolean;
}

class UserProfile extends PuppeteerService {
  async getProfileData(handle: string): Promise<IProfileDetail> {
    const { page, browser } = await this.startBrowser();

    // navigate to profile
    await page.goto(`https://www.instagram.com/${handle}/`);
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
      blocked_by_viewer,
      follows_viewer,
      is_private,
      is_verified,
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
      blocked_by_viewer,
      follows_viewer,
      is_private,
      is_verified,
    };
  }

  async getFollowers(handle: string): Promise<any> {
    const { page } = await this.startBrowser();

    // making an api query to instagram api
    // await page.setRequestInterception(true);

    // page.once('request', (interceptedRequest) => {
    //   interceptedRequest.continue({
    //     method: 'GET',
    //     url:
    //       'https://www.instagram.com/graphql/query/?query_hash=5aefa9893005572d237da5068082d8d5&variables=%7B%22id%22%3A%223251167989%22%2C%22include_reel%22%3Atrue%2C%22fetch_mutual%22%3Atrue%2C%22first%22%3A24%7D',
    //     headers: {
    //       ...interceptedRequest.headers(),
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   });
    // });

    // navigate to profile
    const response = await page.goto(`https://www.instagram.com/${handle}/followers`);
    console.log({
      url: response?.url(),
      statusCode: response?.status(),
      body: await response?.text(),
    });
  }
}

export const userProfile = new UserProfile();
