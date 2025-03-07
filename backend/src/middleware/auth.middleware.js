const jwt = require('jsonwebtoken')

module.exports = {
	verifyJwt: (req, res, next) => {
		const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
		if (!token) return res.status(401).json({ error: 'Нет токена' })

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = decoded
			next()
		} catch (error) {
			res.status(401).json({ error: 'Неверный токен' })
		}
	},
}
