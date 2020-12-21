const multer = require('multer');
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
});

const { Router } = require('express');
const router = Router();

router.post('/', upload.single('file'), (req, res) => {
    return res.send({ url: '/' + req.file.destination + req.file.filename });
});

module.exports = router;