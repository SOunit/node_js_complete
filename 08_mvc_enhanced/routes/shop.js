const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getIndex);
router.get('/cart', productsController.getCart);
router.get('/products', productsController.getProducts);

module.exports = router;
