const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.get('/', async (req, res) => {
    const buyer = (await model.user.findOne({ id: req.session.user })).pid;
    const buys = await model.buy.find({ buyer });
    const items = [];
    for (const buy of buys) {
        var item = await model.product.findOne({ pid: buy.product });
        item.priceStr = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");        
        items.push(item);
    }
    res.render('mypage', { items});
});

router.post('/delete', async (req, res) => {
    const deleteList = req.body.deletes;
    console.log(deleteList);
    const buyer = (await model.user.findOne({ id: req.session.user })).pid;
    for (const item of deleteList) {
        await model.buy.findOneAndDelete({ product: item, buyer });
    }
    res.send({ res: true });
})

module.exports = router;