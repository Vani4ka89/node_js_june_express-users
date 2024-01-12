import fs from "node:fs/promises";
import path from "node:path";

const pathToDb = path.join(process.cwd(), "users-db.json");

const read = async () => {
  const users = await fs.readFile(pathToDb, { encoding: "utf-8" });
  return JSON.parse(users);
};

const write = async (users) => {
  await fs.writeFile(pathToDb, JSON.stringify(users));
};

export { read, write };
