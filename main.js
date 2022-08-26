import { getSuccessfulCandidate } from "./trelloparser/trelloparser.js";
import fs from "fs";
import csv from "csv-parser";
import { jsonToCSV } from "./util/util.js";

const getSuccessfulCandidator = (successfulCandidates, userCsv) => {
  const userResult = [];
  successfulCandidates.forEach((key) => {
    userCsv.forEach((user) => {
      if (user["이름"] === key) {
        const findResult = {
          이름: user["이름"],
          이메일: user["이메일"],
          연락처: user["연락처 (ex: 010-0000-0000)"],
        };
        userResult.push(findResult);
      }
    });
  });
  return userResult;
};

const successfulCandidates = await getSuccessfulCandidate();
const results = [];
fs.createReadStream("./data/data.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    // get successful candidates list
    const csvParseResult = jsonToCSV(
      getSuccessfulCandidator(successfulCandidates, results)
    );
    fs.writeFileSync("./result.csv", csvParseResult);
    console.log("완료.");
  });
