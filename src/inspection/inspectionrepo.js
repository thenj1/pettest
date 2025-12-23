const prisma = require('../config/prisma');

const findAll = async () => {
    return await prisma.inspection.findMany();
}

const findAllbyUser = async(agentId) => {
    return await prisma.inspection.findMany(
        {where: {
            agentId : Number(agentId)
        }}
    )
}

const findAllbyHouse = async(houseId) => {
    return await prisma.inspection.findMany({
        where : 
        {houseId : Number(houseId)}
    })
}

const findOne = async(filter) => {
    return await prisma.inspection.findFirst(
        {where :  filter }
    )
}

const findById = async(id) => {
    return await prisma.inspection.findUnique(
        {where: { id: Number(id) }}
    )
}

const createInspection = async(data) => {
    return await prisma.inspection.create(
        { data: data }
    )
}

const deleteInspection = async(id) => {
    return await prisma.inspection.delete(
        {where: { id: Number(id) } }
     )
}

const updateInspection = async(id, data) => {
    return await prisma.inspection.update(
        {where : { id: Number(id) } , data}
    )
}

module.exports = {
    findAll,
    findOne,
    findById,
    findAllbyUser,
    findAllbyHouse,
    createInspection,
    updateInspection,
    deleteInspection}