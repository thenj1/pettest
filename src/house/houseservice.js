const houseRepo = require('./houserepo');
const { NotFoundError, BadRequestError, ConflictError, UnauthorizedError } = require('../utils/error');

const FindAllHouseByUser = async (ownerId) => {
    const houses = await houseRepo.findAllbyUser(ownerId);
    if ( !houses || houses.length === 0) {
        throw new NotFoundError("Usuário não possui casas cadastradas")
    }

    return houses;
}

const FindAllHouse = async () => {
    const houses = await houseRepo.findAll();
    if ( !houses || houses.length === 0){
        throw new NotFoundError("Nenhuma casa cadastrada")
    }
    
    return houses;
}

const FindHouseByid = async (id) => {
    const house = await houseRepo.findById(id);
    if ( !house ) {
        throw new NotFoundError("Casa não cadastrada")
    }

    return house;
}

const FindHouseByData = async (filter) => {
    const house = await houseRepo.findOne(filter);
    if ( !house ) {
        throw new NotFoundError("Casa não encontrada ou cadastrada")
    }

    return house;
}

const DeleteHouseById = async (id) => {
    const existingHouse = await houseRepo.findById(id);
    if( !existingHouse ) {
        throw new NotFoundError("Casa não cadastrada")
    }

    return await houseRepo.deleteHouse(id);
}

const CreateNewHouse = async (data, userId) => {
    const { ownerName ,address, number, worms, lastVisit } = data;
    const houseDuplicated = await houseRepo.findOne({ number , address });
    
    if( houseDuplicated ){
        throw new ConflictError("Casa já cadastrada nesse endereço e número")
    }

    const newHouseData = {
        ownerName,
        address,
        number,
        worms, // 
        lastVisit: lastVisit || new Date(), 
        agentId: userId 
    };

    const house = await houseRepo.createHouse(newHouseData);
    return house;
}

const UpdateOneHouse = async (id, data) => {
    const { ownerName ,address, number, worms, lastVisit } = data;
    const house = await houseRepo.findById(id);
    if ( !house ) {
        throw new NotFoundError("Casa não cadastrada")
    }

    const updateData = {
        ownerName: ownerName || house.ownerName,
        address: address || house.address,
        number: number || house.number,
        worms: worms !== undefined ? worms : house.worms,
        lastVisit: lastVisit || house.lastVisit,
    }

    const houseUpdated = await houseRepo.updateHouse(id, updateData);
    return houseUpdated;
}

module.exports = {
    FindAllHouseByUser,
    FindAllHouse,
    FindHouseByData,
    FindHouseByid,
    CreateNewHouse,
    DeleteHouseById,
    UpdateOneHouse
}
