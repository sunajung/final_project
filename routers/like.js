const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.post('/', async (req, res) => {
    const { post, pageNumber } = req.body;
    const liker = (await model.user.findOne({ id: req.session.user })).pid;
    const like = await model.like.findOne({ liker,post });
    if (!like) {
        await model.like.create({ liker, post });
        const val = await model.post.findOneAndUpdate({ pid:post }, { $inc: { like: 1 } });
    }
    else {
        await model.like.findOneAndDelete({ liker });
        await model.post.findOneAndUpdate({ pid: post }, { $inc: { like: -1 } });
    }
    res.redirect('/post/' + post + '/' + pageNumber);
});

module.exports = router;