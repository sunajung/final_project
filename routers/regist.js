const { Router } = require('express');
const model = require('../models/model.js').models;
const router = Router();

router.get('/', (req, res) => {
    res.render('regist', {});
});

router.post('/', async (req, res) => {
    const { id, password, name, phone1, phone2, phone3, address, addressDetail } = req.body;
    await model.user.insert({ id, password, name, address, addressDetail, phone1, phone2, phone3 });
    res.redirect('/login');
});

router.post('/duplicateCheck', async (req, res) => {
    const { id } = req.body;
    const user = await model.user.findOne({ 'id': id });
    return res.send({ "res": (!user) ? true : false });
});


module.exports = router;