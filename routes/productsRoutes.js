const express = require('express');

const {
    getAllProducts,
    getProduct
} = require('../controllers/productsController');

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProduct);

module.exports = router;