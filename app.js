const express = require('express');
const Http = require('http');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { errorLogger, errorHandler } = require('./middlewares/error-handler.middleware');
const { urlencoded } = require('express');

const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());;
app.use('/', require('./routes/users.routes'));
app.use('/meetings', require('./routes/meetings.routes'));
app.use('/comments', require('./routes/comments.routes'));
app.use('/likes', require('./routes/likes.routes'))
app.use('/participates', require('./routes/participates.routes'))
app.use('/images', require('./routes/images.routes'))
app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler


http.listen(port, () => {
    console.log(`Start listen Server: ${port}`);
  });
  
  module.exports = http;