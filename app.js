var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const jwt = require('jsonwebtoken');

//  cookie管理
var cookieParser = require('cookie-parser');

//  json处理
var bodyParser = require('body-parser');

//  日志管理
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const roleRouter = require('./routes/role');
const commonRouter = require('./routes/common');

var app = express();

// const url = 'mongodb://localhost:27017/expressWen';
const url = 'mongodb://139.196.100.86:27017/expressWen';

mongoose.connect(url, {useNewUrlParser: true}, function (err) {
	if (err) throw err;
	console.log('数据库链接成功');
});

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(config.jwtSecret));

// 添加json解析

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const whiteList = ['/users/login'];

//  设置跨域请求 全局拦截
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,xToken");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", '3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");

	let cookies = req.cookies['my-cookies'];
	// console.log(req, 6060);
	if (whiteList.includes(req.originalUrl)) {
		next();
	} else if (cookies) {
		jwt.verify(cookies, config.jwtSecret, (err, decoded) => {
			if (err) {
				res.json({
					code: 401,
					message: 'no token detected in http header "Authorization"'
				});
			}
			if (decoded) {
				next();
			}
		});
	} else {
		res.json({
			code: 500,
			message: '检查是否登录成功。'
		});
	}

});

app.use(express.static(path.join(__dirname, 'public')));

//  拦截接口进行验权

/*app.use(function (req, res, next) {
	console.log(req);
	res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
	next();
});*/


//  页面路由

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wen', apiRouter);
app.use('/role', roleRouter);
app.use('/common', commonRouter);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
	next(createError(404));
});

// error handler

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
