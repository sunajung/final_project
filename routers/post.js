const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.get('/:postid', async (req, res) => {
    const { postid } = req.params;
    return res.redirect('./' + postid + '/' +1);
});

router.get('/:postid/:pageNumber', async (req, res) => {
    const { postid, pageNumber } = req.params;
    await model.post.findOneAndUpdate({ pid: postid }, { $inc: { view: 1 } });
    const post = await model.post.findOne({ pid: postid });
    const pdate = post.createdAt;
    post.date = (pdate.getYear() + 1900) + '-' + (pdate.getMonth() + 1) + '-' + pdate.getDate() + ' ' + pdate.getHours() + ':' + pdate.getMinutes() + ':' + pdate.getSeconds();

    const comments = await model.comment.find({ post: postid });
    comments.forEach((item, index, array) => {
        const idate = item.createdAt;
        array[index].date = (idate.getYear() + 1900) + '-' + (idate.getMonth() + 1) + '-' + idate.getDate() + ' ' + idate.getHours() + ':' + idate.getMinutes() + ':' + idate.getSeconds();
    });
    const board = await model.board.findOne({ pid: post.board });

    res.render('post', { post, pageNumber, comments, 'boardName': board.boardName });
});

router.post('/delete', async (req, res) => {
    const { postid } = req.body;
    var post = await model.post.findOne({ pid: postid });
    if (req.session.level < 2 && post.writer != req.session.user) {
        res.send({ res: false });
    }
    await model.post.findOneAndDelete({ pid: postid });
    res.send({ res: true });
});

module.exports = router;