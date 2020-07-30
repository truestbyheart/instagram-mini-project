import puppeteer, { Browser, Page } from 'puppeteer';
// import devices from 'puppeteer/DeviceDescriptors';
import { HEADLESS_STATUS } from '../Config/app.config';

interface Puppeteer {
  browser: Browser;
  page: Page;
}

class PuppeteerService {
  async startDesktopBrowser(): Promise<Puppeteer> {
    const launchOptions = {
      headless: JSON.parse(HEADLESS_STATUS),
      args: ['--no-sandbox'],
    };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    return { browser, page };
  }

  async startBrowser(): Promise<Puppeteer> {
    const launchOptions = {
      headless: JSON.parse(HEADLESS_STATUS),
      args: ['--no-sandbox'],
    };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.emulate(puppeteer.devices['iPhone 6']);
    await page.setDefaultNavigationTimeout(0);

    return { browser, page };
  }

  async startBrowserWithCookies(coookie: string): Promise<Puppeteer> {
    const launchOptions = {
      headless: JSON.parse(HEADLESS_STATUS),
      args: ['--no-sandbox'],
    };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setCookie(...JSON.parse(coookie));
    // await page.emulate(devices['iPhone 6']);
    await page.setDefaultNavigationTimeout(0);

    return { browser, page };
  }

  async closeBrowser(browser: Browser): Promise<void> {
    await browser.close();
  }
}

export const puppeteerService = new PuppeteerService();
