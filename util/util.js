export const jsonToCSV = (jsonData) => {
  const jsonArray = jsonData;
  let csvString = "";
  const titles = Object.keys(jsonArray[0]);
  titles.forEach((title, index) => {
    csvString += index !== titles.length - 1 ? `${title},` : `${title}\r\n`;
  });
  jsonArray.forEach((content, index) => {
    let row = "";
    for (let title in content) {
      row += row === "" ? `${content[title]}` : `,${content[title]}`;
    }
    csvString += index !== jsonArray.length - 1 ? `${row}\r\n` : `${row}`;
  });

  return csvString;
};
