const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");
  envFile.split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }
    const equalIndex = trimmedLine.indexOf("=");
    if (equalIndex === -1) {
      return;
    }
    const key = trimmedLine.slice(0, equalIndex).trim();
    const value = trimmedLine.slice(equalIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "my_admin",
  port: Number(process.env.MYSQL_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
