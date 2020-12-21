const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.get('/', async (req, res) => {
    const userInfo = await model.user.findOne({ id: req.session.user });
    res.render('modifyUserInfo', { userInfo});
});

router.post('/', async (req, res) => {
    const { password, phone1, phone2, phone3, address, addressDetail } = req.body;
    const userInfo = await model.user.findOne({ id: req.session.user });
    userInfo.phone1 = phone1;
    userInfo.phone2 = phone2;
    userInfo.phone3 = phone3;
    userInfo.address = address;
    userInfo.addressDetail = addressDetail;
    if (password) {
        userInfo.password = password;
    }
    await model.user.findOneAndUpdate({ id: req.session.user }, { $set: userInfo });
    res.redirect('/');
});


module.exports = router;