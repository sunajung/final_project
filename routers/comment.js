const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.post('/', (req, res) => {
    const { content, post,pageNumber } = req.body;
    model.comment.insert({ content, writer: req.session.user, post });
    res.redirect('/post/' + post + '/' + pageNumber);
});

module.exports = router;