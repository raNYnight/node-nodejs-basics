import { Worker } from "worker_threads";
import os from "os";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const workerPath = path.join(__dirname, "worker.js");
  const coresNumber = os.cpus().length;
  const workers = [];
  const results = [];

  for (let i = 0; i < coresNumber; i++) {
    const worker = new Worker(workerPath, { workerData: i + 10 });
    workers.push(worker);
  }

  const resultPromises = workers.map((worker, index) => {
    return new Promise((resolve) => {
      worker.on("message", (result) => {
        results[index] = { status: "resolved", data: result };
        resolve();
      });

      worker.on("error", (error) => {
        results[index] = { status: "error", data: null };
        resolve();
      });
    });
  });

  await Promise.all(resultPromises);

  console.log("Results:", results);
};

await performCalculations();
