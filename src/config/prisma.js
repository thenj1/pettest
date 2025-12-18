const { PrismaClient } = require("@prisma/client/extension");

const prisma = new PrismaClient();

module.exports = prisma;