const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    pid: {
        type: Number,     // username 필드의 값은 문자열 타입
        unique: true,     // unique 인덱스 생성(Collection에 username 값이 중복된 문서가 생성될 수 없음)
        required: true,   // mongoose validator: username은 반드시 필요한 필드
    },
    id: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    phone1: String,
    phone2: String,
    phone3: String,
    address: String,
    addressDetail: String,
});

userSchema.virtual('password')
    .set(function (password) {
        this.hashedPassword = bcrypt.hashSync(password, 12);
    });


userSchema.virtual('phone')
    .get(function () {
        return this.phone1 + '-' + this.phone2 + '-' + this.phone3;
    });

userSchema.virtual('fullAddress')
    .get(function () {
        return this.address + '-' + this.addressDetail;
    });

userSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword);
};

const userConuterSchema = new mongoose.Schema({
    count: {
        type: Number,
        unique: true,
        required: true,
    }
});

const userConuter = mongoose.model('UserCounter', userConuterSchema);

var user = mongoose.model('User', userSchema);

user.insert = function (data) {
    userConuter.findOne()
        .then(ret => {
            data.pid = ret.count + 1;
            userConuter.findOneAndUpdate({ count: data.pid })
                .catch(err => console.error(err));
            data.level = 1;
            user.create(data)
                .catch(err => console.error(err));
        });
}

module.exports = user;