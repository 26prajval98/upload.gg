var MB = 1024 * 1024;
var permissions = {}

var addPermission = (p, pF) => {
	permissions[p] = pF
}

var pF_limit_S = (req) => {
	req.user.limit = 25 * MB;
	return true
}

var pF_limit_P = (req) => {
	req.user.limit = 1024 * MB;
	return true
}

var pF_limit_count_S = (req) => {
	if (req.user.count < 5)
		return true
	return false
}

var S = ["L_S", "UL_S"]
var P = ["L_P"]

addPermission(S[0], pF_limit_S)
addPermission(S[1], pF_limit_count_S)
addPermission(P[0], pF_limit_P)

var roles = {
	S: {},
	P: {}
}

for (var i = 0; i < S.length; i++) {
	var pN = S[i]
	var o = {}
	o[pN] = permissions[pN]
	Object.assign(roles.S, o)
}

for (var i = 0; i < P.length; i++) {
	var pN = P[i]
	var o = {}
	o[pN] = permissions[pN]
	Object.assign(roles.P, o)
}

exports.applyPermission = (req) => {
	for (var j = 0; j < req.user.type.length; j++) {
		var r = req.user.type[j]
		var role = roles[r]
		for (var i = 0; i < Object.keys(role).length; i++) {
			let pF = role[Object.keys(role)[i]]
			if (!pF(req))
				return false
		}
	}
	return true
}

exports.roles = roles