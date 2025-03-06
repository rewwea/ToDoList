const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) return res.status(401).json({ error: 'Unauthorized' })

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = await prisma.user.findUnique({ where: { id: decoded.id } })
		next()
	} catch (e) {
		res.status(401).json({ error: 'Invalid token' })
	}
}

module.exports = authMiddleware
