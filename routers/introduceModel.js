const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    res.render('introduceModel', {});
});

module.exports = router;