import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const wrongFilenamePath = path.join(__dirname, "files", "wrongFilename.txt");
  const properFilenamePath = path.join(__dirname, "files", "properFilename.md");
  try {
    if (
      !fs.existsSync(wrongFilenamePath) ||
      fs.existsSync(properFilenamePath)
    ) {
      throw new Error("FS operation failed");
    }

    fs.rename(wrongFilenamePath, properFilenamePath, (err) => {
      if (err) throw err;
      console.log("Rename complete!");
    });
  } catch (error) {
    console.error(error.message);
  }
};

await rename();
