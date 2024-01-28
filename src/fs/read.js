import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");

  try {
    if (!fs.existsSync(filePath)) {
      throw new Error('FS operation failed: "fileToRead.txt" does not exist.');
    }

    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    console.log('Content of "fileToRead.txt":');
    console.log(fileContent);
  } catch (error) {
    console.error(error.message);
  }
};
await read();
