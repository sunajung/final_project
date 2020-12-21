const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.get('/', async (req, res) => {
    var itemList = req.cookies['shopping'];
    if (!itemList) itemList = [];;
    var items = [];
    for (const pid of itemList) {
        const item = await model.product.findOne({ pid });
        item.priceStr = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        items.push(item);
    }
    res.render('shoppingCart', { items});
});

module.exports = router;