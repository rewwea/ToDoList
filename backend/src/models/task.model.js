const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Task {
  async findMany(params) {
    return prisma.task.findMany(params);
  }

  async create(data) {
    return prisma.task.create({ data });
  }

  async update(id, data) {
    return prisma.task.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.task.delete({ where: { id } });
  }
}

module.exports = new Task();
