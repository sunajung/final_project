const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    pid: {
        type: Number,
        unique: true,
        required: true,
    },
    board: {
        type: Number,
        required: true,
    },
    idPerBoard: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    view: {
        type: Number,
        required: true,
        default:0
    },
    like: {
        type: Number,
        required: true,
        default:0
    },
    writer: {
        type: String,
        required: true,
    },

}, { timestamps: true });


const postConuterSchema = new mongoose.Schema({
    board: {
        type: Number,
        unique: true,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    }
});

const postConuter = mongoose.model('PostCounter', postConuterSchema);

const post = mongoose.model('Post', postSchema);

post.insert = async function (data) {
    data.idPerBoard = (await postConuter.findOneAndUpdate({ board: data.board }, { $inc: { count: 1 } }, { returnNewDocument: true })).count + 1;
    data.pid = (await postConuter.findOneAndUpdate({ board: 0 }, { $inc: { count: 1 } }, { returnNewDocument: true })).count + 1;
    return await post.create(data)
        .catch(err => console.error(err));
}

module.exports = post;