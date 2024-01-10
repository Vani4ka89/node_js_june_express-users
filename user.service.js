const fs = require('node:fs/promises');
const path = require('node:path');

const read = async () => {
    const pathToDb = path.join(process.cwd(), 'users-db.json');
    const users = await fs.readFile(pathToDb, {encoding: 'utf-8'});
    return JSON.parse(users);
}

const write = async () => {

}

module.exports = {read, write};