const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.get('/', async (req, res) => {
    var i = 0;
    var newProduct = await model.product.find().sort({ createdAt: -1 }).limit(9);
    newProduct.forEach(item => {
        item.priceStr = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
    var bestProduct = await model.product.find().sort({ like: -1 }).limit(4);
    bestProduct.forEach(item => {
        item.priceStr = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
    res.render('index', { newProduct, bestProduct });
});

module.exports = router;