const User = require('../models/user.model')
const { hashPassword, comparePasswords } = require('../utils/bcrypt.util')
const { generateToken } = require('../utils/jwt.util')

exports.registerUser = async (req, res) => {
	const { login, password, firstName, lastName, patronymic } = req.body

	const existingUser = await User.findUnique({ where: { login } })
	if (existingUser) {
		return res.status(400).json({ error: 'Логин занят' })
	}

	const hashedPassword = await hashPassword(password)
	const user = await User.create({
		data: {
			login,
			password: hashedPassword,
			firstName,
			lastName,
			patronymic,
		},
	})

	res.status(201).json({ id: user.id, login: user.login })
}

exports.loginUser = async (req, res) => {
	const { login, password } = req.body

	const user = await User.findUnique({ where: { login } })
	if (!user) {
		return res.status(401).json({ error: 'Пользователь не найден' })
	}

	const isMatch = await comparePasswords(password, user.password)
	if (!isMatch) {
		return res.status(401).json({ error: 'Неверный пароль' })
	}

	const token = generateToken(user.id)
	res.cookie('token', token, { httpOnly: true }).json({ message: 'Успешно' })
}
