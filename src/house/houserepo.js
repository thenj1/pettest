const prisma = require('../config/prisma');

const findAll = async () => {
    return await prisma.house.findMany();
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

const deleteHouse = async(id) => {
    return await prisma.house.delete(
        {where: { id: Number(id) } }
     )
}

const updateHouse = async(id, data) => {
    return await prisma.house.update(
        {where : { id } , data}
    )
}

module.exports = {
    findAll,
    findOne,
    findById,
    createHouse,
    updateHouse,
    deleteHouse}