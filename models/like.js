const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    liker: {
        type: Number,
        required: true,
    },
    post: {
        type: Number,
        required: true,
    }
})

const like = mongoose.model('like', likeSchema);

module.exports = like;