const fs = require("fs");
const path = require("path");
const sample = require("./sample.json");

// flatten all keys to top level
function flatten(obj, prefix = "") {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? prefix + "." : "";
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flatten(obj[key], pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {});
}

const sampleFlat = flatten(sample);

// read data.txt
const data = fs.readFileSync(path.join(__dirname, "data.txt"), "utf8");

// search for all values which are not in the data.txt file
const missing = Object.keys(sampleFlat).filter(
  (key) => !data.includes(sampleFlat[key])
);
// save the missing values in a new file
fs.writeFileSync(path.join(__dirname, "missing.txt"), missing.join("\n"));
