import fs from "fs";
import path from "path";

const logDirectory = path.join(process.cwd(), "logs");

// Create logs folder if it doesn't exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logFile = path.join(logDirectory, "app.log");

const getTime = () => {
  return new Date().toLocaleString();
};

const logger = {
  info: (message) => {
    const log = `[INFO] ${getTime()} - ${message}\n`;
    console.log(log.trim());
    fs.appendFileSync(logFile, log);
  },

  error: (message) => {
    const log = `[ERROR] ${getTime()} - ${message}\n`;
    console.error(log.trim());
    fs.appendFileSync(logFile, log);
  },

  warning: (message) => {
    const log = `[WARNING] ${getTime()} - ${message}\n`;
    console.warn(log.trim());
    fs.appendFileSync(logFile, log);
  },
};

export default logger;