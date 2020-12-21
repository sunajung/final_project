const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { PORT, COOKIE_SECRET } = require('./env');
const { connect, models } = require('./models/model');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const { authenticated, requireAuthentication, notRequireAuthentication } = require('./middlewares/auth.js');
const { putLatestProduct } = require('./middlewares/putLatestProduct.js');


const homeRouter = require('./routers/home.js');
const loginRouter = require('./routers/login.js');
const registRouter = require('./routers/regist.js');
const detailRouter = require('./routers/detail.js');
const boardRouter = require('./routers/board.js');
const findAddressRouter = require('./routers/findAddress.js');
const writeRouter = require('./routers/write.js');
const imageUploadRouter = require('./routers/imageUploader.js');
const introduceModelRouter = require('./routers/introduceModel.js');
const postRouter = require('./routers/post.js');
const commentRouter = require('./routers/comment.js');
const likeRouter = require('./routers/like.js');
const productBoardRouter = require('./routers/productBoard.js');
const mypageRouter = require('./routers/mypage.js');
const shoppingCartRouter = require('./routers/shoppingCart.js');
const buyRouter = require('./routers/buy.js');
const loginCheckRouter = require('./routers/loginCheck.js');
const modifyUserInfoRouter = require('./routers/modifyUserInfo.js');


connect();
nunjucks.configure('views', {
    express: app,
    watch: true
});
app.set('view engine', 'html');
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(authenticated);
app.use(putLatestProduct);

app.use(morgan('combined'));

app.use('/images', express.static(path.join(__dirname, './images')));
app.use('/js', express.static(path.join(__dirname, './js')));
app.use('/css', express.static(path.join(__dirname, './css')));
app.use('/summernote', express.static(path.join(__dirname, './summernote')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/findAddress', findAddressRouter);
app.use('/regist', notRequireAuthentication, registRouter);
app.use('/board', boardRouter);
app.use('/detail', detailRouter);
app.use('/write', requireAuthentication, writeRouter);
app.use('/imageUpload', imageUploadRouter);
app.use('/introduceModel', introduceModelRouter);
app.use('/post', postRouter);
app.use('/comment', requireAuthentication, commentRouter);
app.use('/like', requireAuthentication, likeRouter);
app.use('/productBoard', productBoardRouter);
app.use('/mypage', requireAuthentication, mypageRouter);
app.use('/shoppingCart', requireAuthentication, shoppingCartRouter);
app.use('/buy', requireAuthentication, buyRouter);
app.use('/loginCheck', requireAuthentication,loginCheckRouter);
app.use('/modifyUserInfo',requireAuthentication, modifyUserInfoRouter);


app.listen(PORT, () => { console.log('server running'); });