require('dotenv').config();
const { PORT, MONGO_URI, COOKIE_SECRET } = process.env;

const express = require('express');
const app = express();
const port = PORT | 4000;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

// CORS
app.use(express.json());
var cors = require('cors');

// cookieParser
app.use(cookieParser());

// 클라이언트 cors 설정 + axios -> withCredentials:true
app.use(
  cors({
    // origin: 'http://localhost:4001',
    origin: 'https://react-mongo-todo-app.vercel.app',
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true, // 쿠키주고받기 허용
  })
);

// json parsing
app.use(express.json());

// 몽고디비 커넥션
const { default: mongoose } = require('mongoose');
mongoose
  .connect(MONGO_URI, {
    dbName: 'Mongoose-test',
  })
  .then(() => {
    console.log('mongodb connected');
  })
  .catch((err) => console.log(err));

// 세션만들기
app.use(
  session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI, dbName: 'Mongoose-test' }),
    name: 'user', // cookie name
    cookie: {
      httpOnly: true,
      // secure: false,
      // maxAge: 3.6e6 * 24
    }, // 24시간 뒤 만료(자동 삭제)
  })
);

// 세션 삭제
// req.session.destroy(err => {
//   if (err) throw err;
//   res.redirect(302, '/'); // 웹페이지 강제 이동
// });

// 라우터
const listRouter = require('./routes/list.router');
const userRouter = require('./routes/user.router');

app.use('/list', listRouter);
app.use('/user', userRouter);

// app.all('/*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   next();
// });

app.listen(port, (req, res) => {
  console.log('start ' + port);
});

module.exports = app;
