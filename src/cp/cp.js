import { spawn } from "child_process";
import { createReadStream, createWriteStream } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const scriptPath = path.join(__dirname, "files", "script.js");

const spawnChildProcess = (args) => {
  const child = spawn("node", [scriptPath, ...args], { stdio: ["pipe", "pipe", "inherit"] });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

const args = ["arg1", "arg2", "arg3"];
spawnChildProcess(args);
