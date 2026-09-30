const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, '../db.json');

async function readFile() {
    const data = await fs.readFile(pathToFile, 'utf8');
    return JSON.parse(data);
}

async function readFileWithDelay() {
    await new Promise(resolve => {
        setTimeout(resolve, 1500);
    });

    return await readFile();
}

async function writeFile(products) {
    await fs.writeFile(
        pathToFile,
        JSON.stringify(products, null, 2)
    );

    return products;
}

module.exports = {
    readFileWithDelay,
    readFile,
    writeFile
};