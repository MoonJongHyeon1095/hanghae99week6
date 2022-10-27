const express = require('express');
const indexRouter = require("./routes/index.routes")
const Http = require('http');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { errorLogger, errorHandler } = require('./middlewares/error-handler.middleware');
const { urlencoded } = require('express');
const passport = require('passport');
const passportConfig = require('./passport');
const expressSession = require('express-session')

const cors = require('cors');
const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 3000;

app.use(cors({
  origin: true, // 출처 허용 옵션
  credential: true // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));

passportConfig();
app.use(express.static('public'));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: [process.env.KAKAO_SECRET],
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());;
app.use(passport.initialize());
app.use(passport.session());

// app.use('/', require('./routes/kakao.routes'));
// app.use('/', require('./routes/users.routes'));
// app.use('/', require('./routes/google.routes'));
// app.use('/meetings', require('./routes/meetings.routes'));
// app.use('/comments', require('./routes/comments.routes'));
// app.use('/likes', require('./routes/likes.routes'))
// app.use('/participates', require('./routes/participates.routes'))
app.use("/", indexRouter);

app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

http.listen(port, () => {
    console.log(`Start listen Server: ${port}`);
  });
  
  module.exports = http;