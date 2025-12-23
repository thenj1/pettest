const prisma = require('../config/prisma');

const findAll = async () => {
    return await prisma.house.findMany();
}

const findAllbyUser = async(agentId) => {
    return await prisma.house.findMany(
        {where: {
            agentId : Number(agentId)
        }}
    )
}

const findOne = async(filter) => {
    return await prisma.house.findFirst(
        {where :  filter }
    )
}

const findById = async(id) => {
    return await prisma.house.findUnique(
        {where: { id: Number(id) }}
    )
}

const createHouse = async(data) => {
    return await prisma.house.create(
        { data: data }
    )
}

const updateHouse = async(id, data) => {
    return await prisma.house.update(
        {where : { id: Number(id) } , data}
    )
}

module.exports = {
    findAll,
    findOne,
    findById,
    findAllbyUser,
    createHouse,
    updateHouse,
    }