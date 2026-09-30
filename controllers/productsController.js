const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
} = require('../services/productsService');

const { clearCache } = require('../middleware/cacheware');

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

async function postProduct(req, res) {
    try {
        const product = await createProduct(req.body);

        clearCache();

        return res.status(201).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

async function putProduct(req, res) {
    try {
        const product = await updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).send('Product not found');
        }

        clearCache();

        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

async function patchProduct(req, res) {
    try {
        const product = await patchProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).send('Product not found');
        }

        clearCache();

        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await deleteProduct(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        clearCache();

        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    postProduct,
    putProduct,
    patchProduct,
    deleteProduct
};