const fs = require("fs");
const path = require("path");
const sample = require("./sample.json");

async function delay(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 100);
  });
}

// async recursive function to format json
async function AsyncRecursiveJson(data) {
  if (data == null) return null;
  else if (typeof data == "boolean") return delay(data);
  else if (typeof data == "number") return delay(data);
  else if (typeof data == "string") return delay(data);
  else if (typeof data === "object") {
    const keys = Object.keys(data);
    await Promise.all(
      keys.map(async (key) => {
        data[key] = await AsyncRecursiveJson(data[key]);
      })
    );
    return data;
  }
  return "error";
}
// sync recursive function to format json
function recursiveJson(data) {
  if (data == null) return null;
  else if (typeof data == "boolean") return data;
  else if (typeof data == "number") return data;
  else if (typeof data == "string") return data;
  else if (typeof data === "object") {
    Object.keys(data).map((key) => {
      data[key] = recursiveJson(data[key]);
    });
    return data;
  }
  return "error";
}
async function writeJsonToFile() {
  const sampleAsync = await AsyncRecursiveJson(sample);
  console.log(
    "Is Async the same result even with delay?",
    JSON.stringify(sampleAsync) == JSON.stringify(recursiveJson(sample))
  );
  fs.writeFileSync(
    path.join(__dirname, "sampleAsync.json"),
    JSON.stringify(sampleAsync)
  );
}
writeJsonToFile();
