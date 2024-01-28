import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");
  const input = fs.createReadStream(filePath);

  return new Promise((resolve, reject) => {
    input.on("error", (error) => {
      reject(error);
    });

    input.pipe(process.stdout);

    input.on("end", () => {
      resolve();
    });
  });
};

await read();
