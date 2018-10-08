const express = require('express');
// const mongoose = require('mongoose');
const apiRouter = require('./Routers/apiRouter');
const bodyParser = require('body-parser');
// const { DB_URL = require('./config.js').DB_URL } = process.env;
// const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log(socket.id)
  socket.emit('news', { hello: 'world' });
  socket.on('update', (data) => {
    console.log(data)
    io.emit(data)
  });
  socket.on('oncheese', function (data) {
    console.log(data);

  })
});


// app.use((cors({
//   methods: ['POST', 'GET', 'DELETE', 'PATCH']
// })));
// mongoose.connect(DB_URL, { useNewUrlParser: true })
//   .then(() => {
//     console.log(`connected to ${DB_URL}...`);
//   });

app.use('/api', apiRouter);

app.get('/*', (req, res, next) => {
  next({ status: 404, msg: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  if (err.code === '23503') res.status(400).send({ msg: 'No data returned from the query.', status: 400 });
  if (err.message === 'No data returned from the query.') res.status(400).send({ msg: 'No data returned from the query.', status: 400 });
  if (err.status) res.status(err.status).send(err);
  else res.status(500).send({ msg: 'Internal server error', status: 500 });
});

module.exports = { app, server };