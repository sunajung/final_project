const mongoose = require('mongoose');

const buySchema = new mongoose.Schema({
    buyer: {
        type: Number,
        required: true,
    },
    product: {
        type: Number,
        required: true,
    }
})

const buy = mongoose.model('buy', buySchema);

module.exports = buy;