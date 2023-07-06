require('dotenv').config();
const { PORT, MONGO_URI } = process.env;

const express = require('express');
const app = express();
const port = PORT | 4000;
const path = require('path');

// CORS
app.use(express.json());
var cors = require('cors');
app.use(cors());

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

// 라우터
const listRouter = require('./routes/list.router');
app.use('/list', listRouter);

app.use(express.static(path.join(__dirname, '/build')));

app.listen(port, (req, res) => {
  console.log('start ' + port);
});

// app.get('*', function (res, req) {
//   req.sendFile(path.join(__dirname, '/build/index.html'));
// });
