import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const list = async () => {
  const folderPath = path.join(__dirname, "files");

  try {
    // const folderExists = await fs.promises.stat(folderPath).catch(() => false);
    if (!fs.existsSync(folderPath)) {
      throw new Error('FS operation failed: "files" folder does not exist.');
    }

    const files = await fs.promises.readdir(folderPath);
    console.log('Filenames in the "files" folder:');
    console.log(files);
  } catch (error) {
    console.error(error.message);
  }
};

await list();
