const sample = require("./sample.json");

function formatJSONToText(data, path = "") {
  let formattedData = "";
  if (typeof data != "object" || data == null)
    formattedData += `$ ${path.slice(0, -1)}\n${data}\n\n`;
  else if (typeof data === "object") {
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((key) => {
        formattedData += formatJSONToText(data[key], `${path + key + "."}`);
      });
    } else {
      formattedData += `${path.slice(0, -1)}\n${JSON.stringify(data)}\n\n`;
    }
  }
  return formattedData;
}
const fs = require("fs");
fs.writeFileSync("./Text.txt", formatJSONToText(sample));
