/*
*
* 实现文件上传等等一些其他的共有方法
*
* */

const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const multer = require('multer');
const uploadUrl = multer({dest: './public/files/'});
const fs = require('fs');
const OSS = require('ali-oss');


router.get('/', function (req, res, next) {
	res.send('common');
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
			console.log(files);
			// let inputFile = files.inputFile[0];
			/*let uploadFile = inputFile.path;
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
			});*/
			res.send({
				code: 200,
				message: '文件上传成功。'
			});
		}
	});
});

const client = new OSS({
	region: 'oss-cn-shanghai',
	accessKeyId: 'LTAIhsFPa3bh4fQ0',
	accessKeySecret: 'GE42ocQ6CfeLzqhqa0lnjXZQWJR2J7',
	bucket: 'file-wen',

});

async function putOss(path, name) {
	try {
		return await client.put(path, name);
	} catch (err) {
		console.log(err);
	}
}

async function putStream(path, name) {
	try {
		let stream = fs.createReadStream(path);
		let size = fs.statSync(path).size;

		return await client.putStream(
			name, stream, {contentLength: size});
	} catch (e) {
		console.log(e)
	}
}

//  todo 文件重新命名 本地的权限访问

// 图片上传
router.post('/uploadOss', (req, res, next) => {
	let form = new multiparty.Form({uploadDir: './public/files/'});
	form.encoding = 'utf-8';
	form.maxFilesSize = 2 * 1024 * 1024;

	form.parse(req, (err, fields, files) => {
		console.log(files)
		if (err) {
			console.log(err);
		} else {
			let obj;
			for (let item in files) {
				obj = files[item][0];
			}
			putStream(obj.path, obj.originalFilename).then((result => {
				console.log(result)
				let {name, url, size} = result;
				res.json({
					code: 200,
					data: {name, url, size}
				})
			}));

		}
	})
});

module.exports = router;