const {
    getProducts,
    getProductById
} = require('../services/productsService');

async function getAllProducts(req, res) {
    try {
        const products = await getProducts();
        return res.json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

async function getProduct(req, res) {
    try {
        const product = await getProductById(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getAllProducts,
    getProduct
};