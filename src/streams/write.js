import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = path.join(__dirname, "files", "fileToWrite.txt");
  const output = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    process.stdin.pipe(output);

    output.on("error", (error) => {
      reject(error);
    });

    output.on("finish", () => {
      resolve();
    });
  });
};

await write();
