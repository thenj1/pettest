const houseRepo = require('./houserepo');
const { NotFoundError, BadRequestError, ConflictError, UnauthorizedError } = require('../utils/error');

const FindAllHouseByAgent = async (agentId) => {
    const houses = await houseRepo.findAllbyUser(agentId);
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

const CreateNewHouse = async (data, agentId) => {
    const { ownerName ,address, number } = data;
    const houseDuplicated = await houseRepo.findOne({ number , address });
    
    if( houseDuplicated ){
        throw new ConflictError("Casa já cadastrada nesse endereço e número")
    }

    const newHouseData = {
        ownerName,
        address,
        number,
        agentId: agentId 
    };

    const house = await houseRepo.createHouse(newHouseData);
    return house;
}

const UpdateOneHouse = async (id, data) => {
    const { ownerName ,address, number } = data;
    const house = await houseRepo.findById(id);
    if ( !house ) {
        throw new NotFoundError("Casa não cadastrada")
    }

    const updateData = {
        ownerName: ownerName || house.ownerName,
        address: address || house.address,
        number: number || house.number,

    }

    const houseUpdated = await houseRepo.updateHouse(id, updateData);
    return houseUpdated;
}

module.exports = {
    FindAllHouseByAgent,
    FindAllHouse,
    FindHouseByData,
    FindHouseByid,
    CreateNewHouse,
    UpdateOneHouse
}
