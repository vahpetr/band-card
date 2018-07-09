// puppeteer https://blog.bitsrc.io/testing-your-react-app-with-puppeteer-and-jest-c72b3dfcde59

import puppeteer from "puppeteer";
import { ValueType } from "../types";

describe("e2e tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      timeout: 3000
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 500 });
    await page.goto("http://localhost:3000/", {
      waitUntil: "networkidle2",
      timeout: 10000
    });
  });

  it(
    "h1 title",
    async () => {
      await page.waitForSelector(".App-title");
      const html = await page.$eval(".App-title", e => e.innerHTML);
      expect(html).toBe("Bond card");
    },
    5000
  );

  it(
    "screenshot",
    async () => {
      await page.screenshot({ path: "images/screenshot.png" });
    },
    5000
  );

  it(
    "has one select with spread value",
    async () => {
      await page.select("select", ValueType.SPREAD);
      const html = await page.$eval("select", e => e.value);
      expect(html).toBe(ValueType.SPREAD);
    },
    5000
  );

  it(
    "select yield value",
    async () => {
      await page.select("select", ValueType.YIELD);
      const html = await page.$eval("select", e => e.value);
      expect(html).toBe(ValueType.YIELD);
    },
    5000
  );

  it(
    "select price value",
    async () => {
      await page.select("select", ValueType.PRICE);
      const html = await page.$eval("select", e => e.value);
      expect(html).toBe(ValueType.PRICE);
    },
    5000
  );

  it(
    "select not available value",
    async () => {
      await page.select("select", "not available value");
      const html = await page.$eval("select", e => e.value);
      expect(html).toBe("");
    },
    5000
  );

  afterAll(() => {
    browser.close();
  });
});
