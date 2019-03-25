/**
 *
 *  组织角色添加
 *
 **/

const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roleController');

router.get('/', function (req, res, next) {
	res.send('roles');
});

//  获取角色
router.get('/fetch', rolesController.fetchRole);

//  创建角色
router.post('/create', rolesController.createRole);

//  修改角色
router.post('/update', rolesController.editRole);

//  删除角色
router.post('/delete', rolesController.deleteRole);

module.exports = router;
