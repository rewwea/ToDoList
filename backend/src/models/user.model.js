const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class User {
	async findUnique(params) {
		return prisma.user.findUnique(params)
	}

	async findMany(params) {
		return prisma.user.findMany(params)
	}

	async create(data) {
		return prisma.user.create({ data })
	}
	async update(id, data) {
		return prisma.user.update({ where: { id }, data })
	}

	async delete(id) {
		return prisma.user.delete({ where: { id } })
	}
}

module.exports = new User()
