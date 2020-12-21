const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.get('/', (req, res) => {
    res.render('login', {
        errorMessage: req.flash('errorMessage')
    });
});

router.post('/', async (req, res) => {
    const { id, password } = req.body;
    const user = await model.user.findOne({ 'id' : id});
    if(!user) {
        req.flash('errorMessage', '등록되지 않은 아이디입니다.');
        console.log('등록되지 않은 아이디입니다.');
        return res.redirect('/login');
    } else if (!user.authenticate(password)) {
        req.flash('errorMessage', '잘못된 비밀번호입니다.');
        console.log('잘못된 비밀번호입니다.');
        return res.redirect('/login');
    }

    req.session.isAuthenticated = true;
    console.log(id);
    req.session.user = id;
    req.session.level = user.level;

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    return res.redirect('/login');
});

module.exports = router;