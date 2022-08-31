import { ID, PW, TRELLO_URL, REQUEST_HEADER } from "../env/env.js";
import puppeteer from "puppeteer";

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
  console.log("페이지 초기 세팅 완료.");
  // get login page
  console.log("로그인 시도 중...");
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
  console.log("로그인 완료.");
  // find successful candidate name
  console.log("지원자 파싱 중...");
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
  console.log("지원자 파싱 완료.");
  return candidateList;
};
