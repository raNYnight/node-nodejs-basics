import fs from "fs";
import zlib from "zlib";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const filePath = path.join(__dirname, "files", "fileToCompress.txt");
  const archivePath = path.join(__dirname, "files", "archive.gz");

  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(archivePath);
  const gzipStream = zlib.createGzip();

  return new Promise((resolve, reject) => {
    readStream.pipe(gzipStream).pipe(writeStream);

    writeStream.on("finish", () => {
      resolve();
    });

    writeStream.on("error", (error) => {
      reject(error);
    });
  });
};

await compress();
