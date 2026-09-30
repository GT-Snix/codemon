const {
    readFileWithDelay,
    readFile,
    writeFile
} = require('../database/productsDatabase');

async function getProducts() {
    return await readFileWithDelay();
}

async function getProductById(id) {
    const products = await readFileWithDelay();

    return products.find(product => product.id === Number(id));
}

async function createProduct(productData) {
    const products = await readFile();

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(product => product.id)) + 1
            : 1,
        ...productData
    };

    products.push(newProduct);

    await writeFile(products);

    return newProduct;
}

async function updateProduct(id, productData) {
    const products = await readFile();

    const index = products.findIndex(
        product => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        id: products[index].id,
        ...productData
    };

    await writeFile(products);

    return products[index];
}

async function patchProduct(id, productData) {
    const products = await readFile();

    const index = products.findIndex(
        product => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...productData
    };

    await writeFile(products);

    return products[index];
}

async function deleteProduct(id) {
    const products = await readFile();

    const index = products.findIndex(
        product => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products.splice(index, 1)[0];

    await writeFile(products);

    return deletedProduct;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};