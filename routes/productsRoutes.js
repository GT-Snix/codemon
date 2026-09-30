const express = require('express');

const {
    getAllProducts,
    getProduct
} = require('../controllers/productsController');

const cacheware = require('../middleware/cacheware');

const router = express.Router();

router.get('/products', cacheware, getAllProducts);
router.get('/products/:id', cacheware, getProduct);

module.exports = router;