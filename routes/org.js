/**
 *
 *  用户组织添加
 *
 **/

const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgController');

router.get('/', function (req, res, next) {
	res.send('Orgs');
});

//  获取组织
router.get('/fetch', orgController.fetchOrg);

//  创建组织
router.post('/create', orgController.createOrg);

//  修改组织
router.post('/update', orgController.editOrg);

//  删除组织
router.post('/delete', orgController.deleteOrg);

module.exports = router;
