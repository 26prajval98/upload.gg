var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var Files = new Schema({
    name: {
        type: String,
        required : true
    },
    isPublic: {
        type: Boolean,
        default: true,
        enum : [true, false]
    },
    owner: mongoose.Types.ObjectId,
    shared: {
		type : [String],
		maxlength : 5
	}
}, {
        timestamps: true
    });

module.exports = mongoose.model('Files', Files);