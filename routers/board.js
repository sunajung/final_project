const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

const NUM_FOR_PAGE = 15;

router.get('/', (req, res) => {
    var posts = [];
    for (var i = 0; i < NUM_FOR_PAGE; i++) {
        posts.push({ 'pid': i, 'title': i + 'st', 'user': i, 'lastdate': i, 'view': i });
    }
    res.render('board', { 'posts': posts, 'pages': ['　', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '>'] });
});

router.get('/:board', (req, res) => {
    var board = req.params.board;
    res.redirect('/board/'+board+'/1');
});

router.get('/:board/:pageNumber', async (req, res) => {
    const board = req.params.board;
    const searchItem = req.query.search ? req.query.search : "";
    if (board != 1 && board != 2 && board != 3 && board != 5) {
        return res.redirect('/');
    }
    const pageNumber = Number(req.params.pageNumber);
    const { boardName } = await model.board.findOne({ 'pid': board });
    var posts = await model.post.find({
        $and: [
            {
                'board': board
            },
            {
                $or: [
                    { name: { $regex: searchItem } },
                    { title: { $regex: searchItem } },
                    { content: { $regex: searchItem } },
                ]
            }
        ]
    }).sort({ idPerBoard: -1 }).skip((pageNumber - 1) * NUM_FOR_PAGE).limit(NUM_FOR_PAGE);
    posts.forEach((item, index, array) => {
        const date = item.createdAt;
        const nowDate = new Date();
        if (date.getDate() == nowDate.getDate() && date.getMonth() == nowDate.getMonth() && date.getYear() == nowDate.getYear()) {
            var minutes = date.getMinutes();
            if (minutes < 10) minutes = '0' + minutes;
            array[index].date = date.getHours() + ':' + minutes;
        }
        else {
            array[index].date = date.getMonth() + ':' + date.getDate();
        }
    });
    

    const postNumber = await model.post.find({ 'board': board }).count();
    const page = Math.floor((postNumber - 1) / NUM_FOR_PAGE) + 1;
    const startPage = pageNumber - ((pageNumber - 1) % 10);
    const pages = [];
    for (var i = 0; i < 10; i++) {
        const nowPage = startPage + i;
        if (nowPage > page) break;
        pages.push(nowPage);
    }
    res.render('board', { 'board': { 'id': board, 'name': boardName }, posts, pages, pageNumber, searchItem});
});

module.exports = router;