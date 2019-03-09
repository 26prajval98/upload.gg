var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var Files = new Schema({
    name: {
        type: String
    },
    isPublic : {
        type: Boolean,
        default: true
    },
    owner : mongoose.Types.ObjectId,
    shared: [{
        uid : mongoose.Types.ObjectId
    }]
}, {
        timestamps: true
    });

module.exports = mongoose.model('Files', Files);