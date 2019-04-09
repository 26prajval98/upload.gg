var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var encryptor = require('file-encryptor');
var File = require('../models/files');
var msg = require('../messages')

var authenticate = require('../authenticate');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', authenticate.verifyUser, async (req, res, next) => {
	try {
		var fo = await File.find({ owner: req.user._id });
		var op;
		if (!fo)
			op = []
		else if (!Array.isArray(fo))
			op = [fo]
		else
			op = fo

		res.json({
			files: op
		})
	}
	catch (err) {
		res.json({
			files: []
		})
	}
})

router.get('/download/:fid', async (req, res, next) => {
	try {
		var file = req.params.fid;
		var fo = await File.findOne({ _id: file });
		if (fo) {
			if (!fo.isPublic) {
				res.json({ ...msg.failure, msg: "File is not public" });
				// res.redirect(`/file/${file}`)
			}
			else {
				if (fs.existsSync(path.join(__dirname, '../public/files', file + ".data"))) {
					var milliseconds = new Date().getTime();
					var timestamp = (milliseconds.toString());
					var f = await File.findOne({ _id: file })
					var fname = timestamp + f.name;
					var key = fs.readFileSync(path.join(__dirname, '../public/files', file + ".key"));
					encryptor.decryptFile(path.join(__dirname, '../public/files', file + ".data"), path.join(__dirname, '../public/decrypt', fname), key, (err) => {
						if (err)
							throw err;
						res.download(path.join(__dirname, '../public/decrypt', fname), (err) => {
							if (err)
								if (err.message != "Request aborted")
									throw err;
							fs.unlinkSync(path.join(__dirname, '../public/decrypt', fname));
						});
					})
				}
				else {
					res.json(msg.failure)
				}
			}
		}
		else {
			res.json({ ...msg.failure, msg: "File does not exist" })
		}
	}
	catch (err) {
		res.json(msg.failure)
	}
})

router.get('/:fid', authenticate.verifyUser, async (req, res, next) => {
	try {
		var file = req.params.fid;
		var fo = await File.findOne({ _id: file });
		if (fo) {
			if (!fo.isPublic) {
				if (fo.shared.indexOf(req.user.username) <= -1 && !fo.ownner.equals(req.user._id)) {
					res.json(msg.failure)
				}
			}
			if (fs.existsSync(path.join(__dirname, '../public/files', file + ".data"))) {
				var milliseconds = new Date().getTime();
				var timestamp = (milliseconds.toString());
				var f = await File.findOne({ _id: file })
				var fname = timestamp + f.name;
				var key = fs.readFileSync(path.join(__dirname, '../public/files', file + ".key"));
				encryptor.decryptFile(path.join(__dirname, '../public/files', file + ".data"), path.join(__dirname, '../public/decrypt', fname), key, (err) => {
					if (err)
						throw err;
					res.download(path.join(__dirname, '../public/decrypt', fname), (err) => {
						if (err)
							throw err;
						fs.unlinkSync(path.join(__dirname, '../public/decrypt', fname));
					});
				})
			}
			else {
				res.json(msg.failure)
			}
		}
		else {
			res.json({ ...msg.failure, msg: "File does not exist" })
		}
	}
	catch (err) {
		res.json(msg.failure)
	}
})

router.get('/delete/:fid', authenticate.verifyUser, async (req, res, next) => {
	try {
		var file = req.params.fid;
		var fo = await File.findOne({ _id: file });
		if (fo) {
			if (!fo.owner.equals(req.user._id)) {
				var m = { ...msg.failure };
				m.msg = "Unauthorized to delete"
				res.json(m)
			}

			if (fs.existsSync(path.join(__dirname, '../public/files', file + ".data"))) {
				fs.unlinkSync(path.join(__dirname, '../public/files', file + ".data"))
				fs.unlinkSync(path.join(__dirname, '../public/files', file + ".key"))
				await File.deleteOne({ _id: file });
				res.json(msg.sucess)
			}
			else {
				res.json(msg.failure)
			}
		}
		else {
			var m = { ...msg.failure };
			m.msg = "File does not exist"
			res.json(m)
		}
	}
	catch (err) {
		console.log(err)
		res.json(msg.failure)
	}
})

router.post('/makepublic/:fid', authenticate.verifyUser, async (req, res, next) => {
	try {
		var f = await File.findOne({ _id: req.params.fid });
		if (f) {
			if (f.owner.equals(req.user._id)) {
				await File.updateOne(
					{ _id: req.params.fid },
					{ $set: { isPublic: req.body.isPublic } }
				)
				res.json(msg.sucess)
			}
			else {
				res.json({ ...msg.failure, msg: "Unauthorized" })
			}
		}
	}
	catch (err) {
		res.json({ ...msg.failure })
		throw err;
	}
})

router.post('/share/:fid', authenticate.verifyUser, async (req, res, next) => {
	try {
		var f = await File.findOne({ _id: req.params.fid });
		if (f.owner.equals(req.user._id)) {
			var eid = req.body.email;
			await File.updateOne(
				{ _id: req.params.fid },
				{ $addToSet: { shared: eid } }
			)
			res.json(msg.sucess)
		}
		else {
			res.json({ ...msg.failure, msg: "Unauthorized" })
		}
	}
	catch (err) {
		res.json(msg.failure)
		throw err;
	}
})

router.post('/unshare/:fid', authenticate.verifyUser, async (req, res, next) => {
	try {
		var f = await File.findOne({ _id: req.params.fid });
		if (f.owner.equals(req.user._id)) {
			var eid = req.body.email;
			await File.updateOne(
				{ _id: req.params.fid },
				{ $pull: { shared: eid } }
			)
			res.json(msg.sucess)
		}
		else {
			res.json({ ...msg.failure, msg: "Unauthorized" })
		}
	}
	catch (err) {
		res.json(msg.failure)
		throw err;
	}
})

module.exports = router;