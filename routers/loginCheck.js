const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.get('/', async (req, res) => {
    res.render('loginCheck', {
        errorMessage: req.flash('errorMessage')
    });
});

router.post('/', async (req, res) => {
    const { password } = req.body;
    const id = req.session.user;
    const user = await model.user.findOne({ 'id': id });
    if (!user.authenticate(password)) {
        req.flash('errorMessage', '잘못된 비밀번호입니다.');
        console.log('잘못된 비밀번호입니다.');
        return res.redirect('/loginCheck');
    }

    res.redirect('/modifyUserInfo');
});

module.exports = router;