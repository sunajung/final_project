const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.get('/:board/:pid', async (req, res) => {
    const board = req.params.board;
    const pid = req.params.pid;
    const boardName = await model.board.findOne({ 'pid': Number(board) });
    const post = await model.post.findOne({ pid });
    console.log(post);
    res.render('write', { 'board': { 'name': boardName.boardName, 'id': board }, post });
});

router.get('/:board', async (req, res) => {
    const board = req.params.board;
    const boardName = await model.board.findOne({ 'pid': Number(board) });
    res.render('write', { 'board': { 'name': boardName.boardName, 'id': board } });
});

router.post('/:board', async (req, res) => {
    console.log('new');
    const board = req.params.board;
    const { title, content } = req.body;
    if (board != 1 && req.session.level < 2) {
        res.redirect('/');
    }
    const pid = (await model.post.insert({ title, content, writer: req.session.user, board, like: 0 })).pid;
    res.redirect('/post/' + pid);
});

router.post('/:board/:postid', async (req, res) => {
    console.log('modify');
    const pid = req.params.postid;
    const board = req.params.board;
    const { title, content } = req.body;
    if (board != 1 && req.session.level < 2) {
        res.redirect('/');
    }
    const nowpid = (await model.post.findOneAndUpdate({ pid }, { $set: {title,content} })).pid;
    res.redirect('/post/' + nowpid);
});

module.exports = router;