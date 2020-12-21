const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://localhost/mongoose-db';

function connect() {
    return mongoose.connect(MONGO_URL);
}

const { connection } = mongoose;

connection.on('error', err => console.error('MongoDB ���� ����'));
connection.on('open', () => console.log('MongoDB ���� ����'));
connection.on('disconnected', () => {
    console.error('MongoDB���� ������ ������ϴ�. ������ ��õ� �մϴ�.');
    connect();
});

const models = {};

// ���⿡ �𵨵��� �߰�
models.user = require('./user.js');
models.product = require('./product.js');
models.board = require('./board.js');
models.post = require('./post.js');
models.comment = require('./comment.js');
models.like = require('./like.js');
models.buy = require('./buy.js');

// connect �Լ��� models�� export �Ͽ� �ܺ� ��⿡�� �𵨵��� ����� �� �ֵ��� ��
module.exports = { connect, models };