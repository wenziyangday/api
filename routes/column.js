/**
 *
 *  栏目添加
 *
 **/

const express = require('express');
const router = express.Router();
const columnController = require('../controllers/columnController');

router.get('/', function (req, res, next) {
	res.send('column');
});

//  获取栏目
router.get('/fetch', columnController.fetchColumn);

//  创建栏目
router.post('/create', columnController.createColumn);

//  修改栏目
router.post('/update', columnController.editColumn);

//  删除栏目
router.post('/delete', columnController.deleteColumn);

module.exports = router;
