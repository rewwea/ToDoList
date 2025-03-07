const jwt = require('jsonwebtoken')

module.exports = {
	generateToken: userId => {
		return jwt.sign({ userId }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		})
	},
}
