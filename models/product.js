const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pid: {
        type: Number,     // username �ʵ��� ���� ���ڿ� Ÿ��
        unique: true,     // unique �ε��� ����(Collection�� username ���� �ߺ��� ������ ������ �� ����)
        required: true,   // mongoose validator: username�� �ݵ�� �ʿ��� �ʵ�
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

// User �� ����(���� MongoDB���� users Collection�� ����)
const product = mongoose.model('product', productSchema);


module.exports = product;