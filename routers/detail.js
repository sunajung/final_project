const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.get('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    var item = await model.product.findOne({ pid });
    item.priceStr = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var lookingCookie = req.cookies['looking'];
    if (!lookingCookie) lookingCookie = [];
    if (!lookingCookie.includes(pid)) {
        if (lookingCookie.length == 3) {
            lookingCookie.pop();
        }
        lookingCookie.unshift(pid);
    }
    res.cookie('looking', lookingCookie);
    res.render('detail', { 'item': item });
});

router.post('/', async (req, res) => {
    const pid = req.body.pid;
    var shoppingCookie = req.cookies['shopping'];
    if (!shoppingCookie) shoppingCookie = [];
    if (shoppingCookie.includes(pid)) {
        res.send({ res: false });
    }
    else {
        shoppingCookie.push(pid);
        res.cookie('shopping', shoppingCookie);
        res.send({ res: true });
    }
});

module.exports = router;