var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var encryptor = require('file-encryptor');
var oid = require('mongoose').Types.ObjectId;
var File = require('../models/files');
var User = require('../models/users');
var msg = require('../messages')

var authenticate = require('../authenticate');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files');
    },
    filename: (req, file, cb) => {
        File.create({
            name: file.originalname,
            owner: req.user._id
        })
            .then(ft => {
                cb(null, ft._id.toString())
            })
            .catch(err => {
                throw err;
            })
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

var upload = multer({ storage: storage, fileFilter: FileFilter });

router.post('/', authenticate.verifyUser, upload.single('file'), (req, res, next) => {
    encrypt(req.file);
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json({ success: true });
})

router.post('/update/makepublic/:fid', authenticate.verifyUser, upload.single('file'), async (req, res, next) => {
    try {
        var f = File.findOne({ _id: req.params.fid });
        if (f.owner.equals(req.user._id)) {
            await File.updateOne(
                { _id: req.params.fid },
                { $set: { isPublic: true } }
            )
            res.json(msg.sucess)
        }
        throw new Error("Unauthorized")
    }
    catch (err) {
        res.json(msg.failure)
        throw err;
    }
})

router.post('/update/share/:fid', authenticate.verifyUser, async (req, res, next) => {
    try {
        var f = File.findOne({ _id: req.params.fid });
        if (f.owner.equals(req.user._id)) {
            var eid = req.body.email;
            await File.updateOne(
                { _id: req.params.fid },
                { $addToSet: { shared: eid } }
            )
            res.json(msg.sucess)
        }
        throw new Error("Unauthorized")
    }
    catch (err) {
        res.json(msg.failure)
        throw err;
    }
})

router.post('/update/remove/:fid', authenticate.verifyUser, async (req, res, next) => {
    try {
        var f = File.findOne({ _id: req.params.fid });
        if (f.owner.equals(req.user._id)) {
            var eid = req.body.email;
            await File.updateOne(
                { _id: req.params.fid },
                { $pull: { shared: eid } }
            )
            res.json(msg.sucess)
        }
        throw new Error("Unauthorized")
    }
    catch (err) {
        res.json(msg.failure)
        throw err;
    }
})

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/files/userPH.png'));
})

router.get('/:fid', async (req, res, next) => {
    try {
        var file = req.params.fid;
        if (fs.existsSync(path.join(__dirname, '../public/files', file + ".data"))) {
            var milliseconds = new Date().getTime();
            var timestamp = (milliseconds.toString());
            var f = await File.findOne({ _id: file })
            var fname = timestamp + f.name;
            var key = fs.readFileSync(path.join(__dirname, '../public/files', file + ".key"));
            encryptor.decryptFile(path.join(__dirname, '../public/files', file + ".data"), path.join(__dirname, '../public/decrypt', fname), key, (err) => {
                if (err)
                    throw err;
                res.download(path.join(__dirname, '../public/decrypt', fname));
                fs.unlinkSync(path.join(__dirname, '../public/decrypt', fname));
            })
        }
        else {
            res.json(msg.failure)
        }
    }
    catch (err) {
        res.json(msg.failure)
    }
})

module.exports = router;