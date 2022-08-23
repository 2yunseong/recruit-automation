import { ID, PW } from "./env/env.js";
import puppeteer from "puppeteer";
const TRELLO_URL =
  "https://trello.com/b/g0aTyly7/2022-econovation-1%ED%95%99%EA%B8%B0-%EC%8B%A0%EC%9E%85%EB%AA%A8%EC%A7%91-tf%ED%8C%80";
const REQUEST_HEADER = "1차 합격 (지원서) - 금 면접";

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const findIndexByName = async (arr, name) => {
  return arr.findIndex((element) => name === element);
};

const getSuccessfulByIndex = async (arr, idx) => {
  return arr.at(idx);
};

export const getSuccessfulCandidate = async () => {
  // browser setting
  await console.log("페이지 초기 로딩중..");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 5000,
  });
  // get login page
  await page.goto("https://trello.com/login");
  const idElement = await page.waitForSelector("#user");
  await idElement.click();
  await page.keyboard.sendCharacter(ID);
  const loginBtn = await page.waitForSelector("#login");
  await loginBtn.click();
  await delay(1500);
  const passwdElement = await page.waitForSelector("#password");
  await passwdElement.click();
  await delay(1500);
  await page.keyboard.sendCharacter(PW);
  await page.keyboard.press("Enter");
  // get trello page
  await page.waitForSelector("#popover-boundary");
  await page.goto(TRELLO_URL);
  // find successful candidate name
  await page.waitForSelector(".list-cards.u-fancy-scrollbar");
  const boardHeaders = await page.$$eval(
    ".list-header-name-assist.js-list-name-assist",
    (headers) => headers.map((e) => e.innerText)
  );
  const headerId = await findIndexByName(boardHeaders, REQUEST_HEADER);
  const boards = await page.$$(".list-cards");
  const successfulBoard = await getSuccessfulByIndex(boards, headerId);
  const boardElement = await successfulBoard.$$eval(
    ".list-card-title.js-card-name",
    (cards) => cards.map((e) => e.innerText)
  );
  const candidateList = boardElement.map((e) => e.substr(0, 3));
  return candidateList;
};
