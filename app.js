const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usersRouter = require('./src/routes/users');
const postsRouter = require('./src/routes/posts');
const cors = require('cors');
require('./src/middlewares/auth');
require('dotenv').config();
require('./src/services/db');

const app = express();

app.use(cors({origin:'http://localhost:3000', credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log("server listiening on port 3000")});

