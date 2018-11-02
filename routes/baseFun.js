/*
*
* 实现文件上传等等一些其他的共有方法
*
* */

const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const fs = require('fs');

router.get('/', function (req, res, next) {
	res.send('baseFun');
});

router.post('/upload', function (req, res, next) {
	//  这是一个绝对路径
	let form = new multiparty.Form({uploadDir: './public/files/'});
	form.encoding = 'utf-8';
	form.maxFilesSize = 2 * 1024 * 1024;

	//  todo 对上传文件类型进行判断

	form.parse(req, function (err, fields, files) {
		if (err) {
			console.log('parse:' + err);
		} else {
			let inputFile = files.inputFile[0];
			let uploadFile = inputFile.path;
			let distName = './public/files/' + inputFile.originalFilename;
			console.log(distName);
			fs.rename(uploadFile, distName, function (err) {
				if (err) {
					console.log('rename error: ' + err);
					res.end("{'status':200, 'message': '上传失败！'}");
				} else {
					console.log('rename ok');
					res.end("{'status':400, 'message': '上传成功！'}");
				}
			})
		}
	});
	res.send({
		code: 200,
		message: '文件上传成功。'
	});
});


module.exports = router;