const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../utils/prisma')

const router = express.Router()

// Регистрация
router.post('/register', async (req, res) => {
	try {
		const { firstName, lastName, login, password, managerId } = req.body

		// Проверка существования пользователя
		const existingUser = await prisma.user.findUnique({ where: { login } })
		if (existingUser)
			return res.status(400).json({ error: 'User already exists' })

		// Хеширование пароля
		const hashedPassword = await bcrypt.hash(password, 10)

		// Создание пользователя
		const user = await prisma.user.create({
			data: {
				firstName,
				lastName,
				login,
				password: hashedPassword,
				managerId: managerId || null,
			},
		})

		res.status(201).json(user)
	} catch (error) {
		res.status(500).json({ error: 'Registration failed' })
	}
})

// Логин
router.post('/login', async (req, res) => {
	try {
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
	} catch (error) {
		res.status(500).json({ error: 'Login failed' })
	}
})

module.exports = router
