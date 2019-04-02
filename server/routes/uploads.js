var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var encryptor = require('file-encryptor');
var oid = require('mongoose').Types.ObjectId;
var File = require('../models/files');

var authenticate = require('../authenticate');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/files');
	},
	filename: (req, file, cb) => {
		req.fid = new oid()
		cb(null, req.fid.toString())
	}
})

var encrypt = (file) => {
	var fileKey = path.join(__dirname, '../public/files/', file.filename + '.key');
	var fn = path.join(__dirname, '../public/files/', file.filename);
	var encryptedFile = path.join(__dirname, '../public/files/', file.filename + '.data');
	var key = new oid().toString();

	fs.writeFileSync(fileKey, key)
	encryptor.encryptFile(fn, encryptedFile, key, {}, (err) => {
		fs.unlinkSync(fn)
	})
}


var FileFilter = (req, file, cb) => {
	return cb(null, true);
};

router.post('/', authenticate.verifyUser, authenticate.userType, (req, res, next) => {
	var upload = multer({ storage: storage, fileFilter: FileFilter, limits: { fileSize: req.user.limit } });
	upload.single('file')(req, res, (err) => {
		if (err) {
			next(err);
		}
		else {
			File.create({
				_id: req.fid,
				name: req.file.originalname,
				owner: req.user._id
			})
				.then(() => {
					encrypt(req.file);
					res.statusCode = 200;
					res.setHeader('Content-type', 'application/json');
					res.json({ success: true });
				})
				.catch(err => {
					throw err;
				})
		}
	})
})

module.exports = router;