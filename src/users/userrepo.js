const prisma = require('../config/prisma');

const findAll = async () => {
    return await prisma.user.findMany()
};

const findOne = async (filter) => {
    return await prisma.user.findFirst(
        {where : filter }
    )
}

const findById = async (id) => {
    return await prisma.user.findUnique(
        {where : { id: Number(id) }}
    )
}

const createUser = async (data) => {
    return await prisma.user.create(
        { data: data }
    )
}

const deleteUser = async (id) => {
    return await prisma.user.delete(
        {where : { id: Number(id) }}
    )
}

const updateUser = async (id, data) => {
    return await prisma.user.update(
        {where : { id: Number(id) },  data }
    )
}

module.exports = {
    findAll,
    findOne,
    findById,
    createUser,
    deleteUser,
    updateUser}