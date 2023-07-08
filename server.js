require('dotenv').config();
const { PORT, MONGO_URI, COOKIE_SECRET } = process.env;

const express = require('express');
const app = express();
const port = PORT | 4000;
const session = require('express-session');
const MongoStore = require('connect-mongo');

// CORS
app.use(express.json());
var cors = require('cors');

// 클라이언트 cors 설정 + axios -> withCredentials:true
app.use(
  cors({
    // origin: 'http://localhost:3000',
    origin: 'https://react-mongo-todo-app.vercel.app',
    // origin: 'https://heesunae.github.io',
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

app.set('trust proxy', 1);

// 세션만들기
app.use(
  session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI, dbName: 'Mongoose-test' }),
    name: 'user', // cookie name
    proxy: true,
    cookie: {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      domain: 'https://react-mongo-todo-app-server.vercel.app',
      // maxAge: 3.6e6 * 24
    }, // 24시간 뒤 만료(자동 삭제)
  })
);

// 라우터
const listRouter = require('./routes/list.router');
const userRouter = require('./routes/user.router');

app.use('/list', listRouter);
app.use('/user', userRouter);

app.listen(port, (req, res) => {
  console.log('start ' + port);
});

module.exports = app;
