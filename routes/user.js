/**
 *
 *  用户添加
 *
 **/

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', function (req, res, next) {
	res.send('users');
});

//  获取用户
router.get('/fetch', usersController.fetchUsers);

//  创建用户
router.post('/create', usersController.createUsers);

//  修改用户
router.post('/update', usersController.editUsers);

//  删除用户
router.post('/delete', usersController.deleteUsers);

module.exports = router;
