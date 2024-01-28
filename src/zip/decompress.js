import fs from "fs";
import zlib from "zlib";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const archivePath = path.join(__dirname, "files", "archive.gz");
  const filePath = path.join(__dirname, "files", "fileToCompress.txt");
  const readStream = fs.createReadStream(archivePath);
  const writeStream = fs.createWriteStream(filePath);
  const gunzipStream = zlib.createGunzip();

  return new Promise((resolve, reject) => {
    readStream.pipe(gunzipStream).pipe(writeStream);

    writeStream.on("finish", () => {
      resolve();
    });

    writeStream.on("error", (error) => {
      reject(error);
    });
  });
};

await decompress();
