import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const sourceFolderPath = path.join(__dirname, "files");
  const destinationFolderPath = path.join(__dirname, "files_copy");

  try {
    if (!fs.existsSync(sourceFolderPath)) {
      throw new Error('FS operation failed: "files" folder does not exist.');
    }

    if (fs.existsSync(destinationFolderPath)) {
      throw new Error(
        'FS operation failed: "files_copy" folder already exists.'
      );
    }

    await fs.promises.mkdir(destinationFolderPath);

    const files = await fs.promises.readdir(sourceFolderPath);

    for (const file of files) {
      const sourceFilePath = path.join(sourceFolderPath, file);
      const destinationFilePath = path.join(destinationFolderPath, file);
      await fs.promises.copyFile(sourceFilePath, destinationFilePath);
    }

    console.log("Folder contents copied successfully.");
  } catch (error) {
    console.error(error.message);
  }
};

await copy();
