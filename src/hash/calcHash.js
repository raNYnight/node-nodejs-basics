import { createHash } from "crypto";
import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function calcHash() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      "files",
      "fileToCalculateHashFor.txt"
    );

    const hash = createHash("sha256");
    const input = createReadStream(filePath);

    input.on("error", (error) => {
      reject(error);
    });

    hash.once("readable", () => {
      const data = hash.read();
      if (data) {
        resolve(data.toString("hex"));
      } else {
        reject(new Error("Hash calculation failed."));
      }
    });

    input.pipe(hash);
  });
}

calcHash()
  .then((hash) => {
    console.log("SHA256 hash:", hash);
  })
  .catch((error) => {
    console.error("Error calculating hash:", error);
  });
