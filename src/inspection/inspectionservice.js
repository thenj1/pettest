const {  NotFoundError, BadRequestError, ConflictError, UnauthorizedError} = require('../utils/error');
const inspectionRepo = require('./inspectionrepo');
const houseRepo = require('../house/houserepo');

const findAllInspection = async () => {
    const inspections = await inspectionRepo.findAll();
    if ( !inspections || inspections.length === 0){
        throw new NotFoundError("Nenhum registro encontrado")
    }

    return inspections;
}

const findInspectionById = async (id) => {
    const inspection = await inspectionRepo.findById(id);
    if ( !inspection ){
        throw new NotFoundError("Nenhum registro encontrado");
    } 
    
    return inspection;
}

const findInspectionByData = async (filter) => {
    const inspection = await inspectionRepo.findOne(filter);
    if ( !inspection ){
        throw new NotFoundError("Nenhum registro encontrado")
    }

    return inspection;
}

const getHistoryByHouse = async (houseId) => {
    const history = await inspectionRepo.findAllbyHouse(houseId);

    
    return history || [];
}

const findAllInspectionByAgent = async (agentId) => {
    const production = await inspectionRepo.findAllbyAgent(agentId);
    if ( !production || production.length === 0 ){
        throw new NotFoundError("Nenhum registro encontrado")
    }
    
    return production;
}

const createNewInspection = async (data, agentId) => {
    const { ownerName ,address, number ,
        worms, visitedAt, status} = data
    let house = await houseRepo.findOne( { address, number } )
    if ( !house ){
        house = await houseRepo.createHouse({
            ownerName,
            address,
            number,
            agentId: agentId
        });
    }

    const newInspection = await inspectionRepo.createInspection({
        worms,
        visitedAt: visitedAt || new Date(),
        status,
        houseId: house.id,
        agentId: agentId
    });

    return { inspection: newInspection , house: house };
}

module.exports = {
    findAllInspection,
    findAllInspectionByAgent,
    findInspectionByData,
    findInspectionById,
    getHistoryByHouse,
    createNewInspection
}