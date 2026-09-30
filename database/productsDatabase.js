const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, '../db.json');

async function readFile() {
    try {
        const data = await fs.readFile(pathToFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
}

async function readFileWithDelay() {
    await new Promise(resolve => {
        setTimeout(resolve, 1500);
    });

    return await readFile();
}

module.exports = {
    readFileWithDelay
};