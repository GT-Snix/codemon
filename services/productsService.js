const { readFileWithDelay } = require('../database/productsDatabase');

async function getProducts() {
    return await readFileWithDelay();
}

async function getProductById(id) {
    const products = await readFileWithDelay();

    return products.find(product => product.id === Number(id));
}

module.exports = {
    getProducts,
    getProductById
};