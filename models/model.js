const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://localhost/mongoose-db';

function connect() {
    return mongoose.connect(MONGO_URL);
}

const { connection } = mongoose;

connection.on('error', err => console.error('MongoDB 연결 에러'));
connection.on('open', () => console.log('MongoDB 연결 성공'));
connection.on('disconnected', () => {
    console.error('MongoDB와의 연결이 끊겼습니다. 연결을 재시도 합니다.');
    connect();
});

const models = {};

// 여기에 모델들을 추가
models.user = require('./user.js');
models.product = require('./product.js');
models.board = require('./board.js');
models.post = require('./post.js');
models.comment = require('./comment.js');
models.like = require('./like.js');
models.buy = require('./buy.js');

// connect 함수와 models을 export 하여 외부 모듈에서 모델들을 사용할 수 있도록 함
module.exports = { connect, models };