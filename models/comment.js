const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        required: true
    }

}, { timestamps: true })

const comment = mongoose.model('comment', commentSchema);

comment.insert = async function (data) {
    comment.create(data)
        .catch(err => console.error(err));
}
module.exports = comment;