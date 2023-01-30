const fs = require("fs/promises");

exports.readFile = async (filePath) => {
  const userFileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(userFileContent);
};

exports.writeToFile = (filePath, contentToWrite) => {
  return fs.writeFile(
    filePath,
    JSON.stringify(contentToWrite),
    "utf-8"
  );
};
