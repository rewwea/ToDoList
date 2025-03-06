const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

router.post('/login', async (req, res) => {
	const { login, password } = req.body
	const user = await prisma.user.findUnique({ where: { login } })

	if (!user) return res.status(404).json({ error: 'User not found' })
	if (!bcrypt.compareSync(password, user.password)) {
		return res.status(401).json({ error: 'Invalid password' })
	}

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '1h',
	})
	res.json({ token })
})

module.exports = router
