const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const { generateToken } = require('../utils/jwt.util')

exports.getTasks = async (req, res) => {
	const userId = req.user.userId

	const tasks = await Task.findMany({
		where: {
			OR: [{ creatorId: userId }, { responsibleId: userId }],
		},
		include: { responsible: true },
		orderBy: { updatedAt: 'desc' },
	})

	res.json(tasks)
}

exports.createTask = async (req, res) => {
	const { title, description, dueDate, responsibleId, priority } = req.body
	const creatorId = req.user.userId

	// Проверка: ответственный — подчинённый?
	const isSubordinate = await isSubordinate(creatorId, responsibleId)
	if (!isSubordinate) {
		return res
			.status(403)
			.json({ error: 'Нельзя назначить этого пользователя' })
	}

	const task = await Task.create({
		data: {
			title,
			description,
			dueDate: new Date(dueDate),
			priority,
			creatorId,
			responsibleId,
		},
	})

	res.status(201).json(task)
}

async function isSubordinate(managerId, userId) {
	let user = await User.findUnique({
		where: { id: userId },
		select: { managerId: true },
	})
	if (!user) return false

	if (user.managerId === managerId) return true

	return isSubordinate(managerId, user.managerId)
}
