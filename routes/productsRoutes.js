const express = require('express');

const {
    getAllProducts,
    getProduct,
    postProduct,
    putProduct,
    patchProduct,
    deleteProduct
} = require('../controllers/productsController');

const { cacheware } = require('../middleware/cacheware');

const router = express.Router();

router.get('/products', cacheware, getAllProducts);
router.get('/products/:id', cacheware, getProduct);

router.post('/products', postProduct);
router.put('/products/:id', putProduct);
router.patch('/products/:id', patchProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;