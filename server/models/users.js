var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var Users = new Schema({
    type: {
        type: String,
        enum: ['S', 'P'],
        default : 'S'
    },
    facebookId: {
        type: String,
    }
}, {
        timestamps: true
    });

Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', Users);