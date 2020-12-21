const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.post('/', async (req, res) => {
    const { buys } = req.body;
    const buyer = (await model.user.findOne({ id: req.session.user })).pid;
    var buylist = [];
    var price = 0;
    for (const item of buys) {
        var itemList = req.cookies['shopping'];
        itemList.splice(itemList.indexOf(item));
        res.cookie('shopping', itemList);
        buylist.push({ buyer, product: item });
        price += (await model.product.findOne({ pid: item })).price;
    }
    const priceStr = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    await model.buy.create(buylist);
    res.send({ res: true ,priceStr});
});

router.post('/delete', async (req, res) => {
    const { deletes } = req.body;
    var itemList = req.cookies['shopping'];
    itemList.splice(itemList.indexOf(deletes));
    res.cookie('shopping', itemList);
    res.send({ res: true });
});

module.exports = router;