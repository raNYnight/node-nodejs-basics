import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const fileToRemovePath = path.join(__dirname, "files", "fileToRemove.txt");
  try {
    if (!fs.existsSync(fileToRemovePath)) {
      throw new Error("FS operation failed");
    }

    fs.unlink(fileToRemovePath, (err) => {
      if (err) throw err;
      console.log(`${fileToRemovePath} was deleted`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

await remove();
