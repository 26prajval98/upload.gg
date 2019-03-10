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
    console.log(file);
    return cb(null, true);
};

var middleware = async (req, res, next) => {
    try {
        var MB = 1024 * 1024;
        req.user.limit = 25 * MB;
        if (req.user.type == "P")
            req.user.limit = 50 * MB

        var c = await File.find({ owner: req.user._id }).countDocuments();

        if ((req.user.type != "P") && c >= 5) {
            var m = { ...msg.failure };
            m.msg = "Upload limit reached";
            res.json(m)
        }
        else {
            next()
        }
    }
    catch (err) {
        next(err);
    }
}

router.post('/', authenticate.verifyUser, middleware, (req, res, next) => {
    var upload = multer({ storage: storage, fileFilter: FileFilter, limits: { fileSize: req.user.limit } });
    upload.single('file')(req, res, (err) => {
        if (err) next(err)
        encrypt(req.file);
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json({ success: true });
    })
})

module.exports = router;