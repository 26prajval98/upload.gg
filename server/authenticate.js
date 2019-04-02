var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/users');
var FacebookTokenStrategy = require('passport-facebook-token');
var msg = require('./messages')

var opts = {};

var cookieStrategy = () => {
	return (request) => {
		var x = request.headers.cookie;
		if (x) {
			x = x.split(";");
			var y = {};
			for (var i = 0; i < x.length; i++) {
				var t = x[i].split("=");
				y.name = t[0];
				y.val = t[1];
				if (y.name == "uploadgg")
					return y.val;
			}
		}
		return ExtractJWT.fromAuthHeaderAsBearerToken()(request);
	}
}

opts.jwtFromRequest = cookieStrategy();

opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JWTStrategy(opts,
	(jwt_payload, done) => {
		User.findOne({ _id: jwt_payload._id }, (err, user) => {
			if (err) {
				return done(err, false);
			}
			else if (user) {
				return done(null, user);
			}
			else {
				return done(null, false);
			}
		});
	}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var middleware = async (req, res, next) => {
	try {
		var MB = 1024 * 1024;
		req.user.limit = 25 * MB;
		if (req.user.type == "P")
			req.user.limit = 1024 * MB

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

exports.local = passport.use(new LocalStrategy(User.authenticate()));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.getToken = (user) => {
	return jwt.sign(user, config.secretKey, { expiresIn: 24 * 60 * 60 });
}

exports.userType = middleware

exports.validateEmail = (email)=>{
	var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return re.test(String(email).toLowerCase());
}

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
	clientID: config.facebook.clientId,
	clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
	User.findOne({ facebookId: profile.id }, (err, user) => {
		console.log(profile);
		if (err) {
			return done(err, false);
		}
		if (!err && user !== null) {
			return done(null, user);
		}
		else {
			User.findOne({ username: profile.emails[0].value }, (err, user) => {
				if (err) {
					return done(err, false);
				}
				if (!err && user !== null) {
					user.facebookId = profile.id;
					user.save((err, user) => {
						if (err)
							return done(err, false);
						else
							return done(null, user);
					})
				}
				else {
					user = new User({ username: profile.emails[0].value });
					user.facebookId = profile.id;
					user.save((err, user) => {
						if (err)
							return done(err, false);
						else
							return done(null, user);
					})
				}
			})
		}
	});
}
));