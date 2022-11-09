
const express = require('express');
const controller = require('../controllers/productosApisController');
const router = express.Router();

router.get('/api/products', controller.list)
router.get('/api/productsRaw', controller.raw)
router.get('/api/products/:id', controller.show)
router.get('/modelosApi', controller.listModels)


module.exports = router