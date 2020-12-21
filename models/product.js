const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pid: {
        type: Number,     // username 필드의 값은 문자열 타입
        unique: true,     // unique 인덱스 생성(Collection에 username 값이 중복된 문서가 생성될 수 없음)
        required: true,   // mongoose validator: username은 반드시 필요한 필드
    },
    title: {
        type: String,
        required: true,
    },
    titlePrefix: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });

// User 모델 생성(실제 MongoDB에는 users Collection이 생성)
const product = mongoose.model('product', productSchema);


module.exports = product;