var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: '加油你是最棒的！！！'});
});

module.exports = router;
