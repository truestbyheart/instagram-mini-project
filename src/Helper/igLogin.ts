import { puppeteerService } from '../Helper/puppeteer.service';
import { shortDelayTime, getRandomDelayTime } from './randomDelayTime';
import { successResponse } from '../Modules/common/response';

const delay_time = getRandomDelayTime(shortDelayTime);
// export let user_cookies: {}[];
export const loginHelper = (username: string, password: string) => {
  return async () => {
    try {
      const { page, browser } = await puppeteerService.startBrowser();

      await page.goto('http://instagram.com/accounts/login');
      await page.waitFor(delay_time);
      //sexy_vava
      await page.type('input[aria-label="Phone number, username, or email"]', username);
      await page.waitFor(delay_time);
      // password_sexy_vava_password
      await page.type('[name=password]', password);
      await page.waitFor(delay_time);
      await page.click('button[type="submit"]');
      await page.waitFor(delay_time);
      const user_cookies = await page.cookies();
      // const wrong_username = await page.waitForSelector('p[aria-atomic="true"]');
      // const success_login = await page.waitForSelector('form[@role="presentation"]');
      browser.close();
      try {
        await page.waitForSelector('form[@role="presentation"]');
        return user_cookies;
      } catch {
        return console.log('wrong password or username');
      }
      // return success_login
      //   ? 'successful logged in' && user_cookies
      //   : wrong_username
      //   ? "The username you entered doesn't belong to an account. Please check your username and try again."
      //   : 'wrong Password';
    } catch (error) {
      return error;
    }
  };
};
