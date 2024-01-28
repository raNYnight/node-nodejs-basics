import { parentPort, workerData } from "worker_threads";

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  const n = workerData;

  try {
    const result = nthFibonacci(n);
    parentPort.postMessage(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

sendResult();
