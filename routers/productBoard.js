const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

const NUM_FOR_PAGE = 16;

router.get('/', async (req, res) => {
    return res.redirect('/productBoard/1');
});

router.get('/:pageNumber', async (req, res) => {
    const pageNumber = Number(req.params.pageNumber);
    const searchItem = req.query.search ? req.query.search : "";
    var products = await model.product.find({
        $or: [
            { name: { $regex: searchItem } },
            { title: { $regex: searchItem } },
            { content: { $regex: searchItem } },
        ]
    }).sort({ pid: -1 }).skip((pageNumber - 1) * NUM_FOR_PAGE).limit(NUM_FOR_PAGE);
    products.forEach(item => {
        item.priceStr = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
    const postNumber = await model.product.find({
        $or: [
            { name: { $regex: searchItem } },
            { title: { $regex: searchItem } },
            { content: { $regex: searchItem } },
        ]
    }).count();
    const page = Math.floor((postNumber - 1) / NUM_FOR_PAGE) + 1;
    const startPage = pageNumber - ((pageNumber - 1) % 10);
    const pages = [];
    for (var i = 0; i < 10; i++) {
        const nowPage = startPage + i;
        if (nowPage > page) break;
        pages.push(nowPage);
    }
    res.render('productBoard', { products, pages, pageNumber, searchItem});
});


module.exports = router;