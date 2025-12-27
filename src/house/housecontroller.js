const houseService = require('./houseservice');
const asyncHandler = require('../utils/trycatchhandler');


const findHouses = asyncHandler(async (req, res, next) => {
    const houses = await houseService.FindAllHouse();
    res.json(houses)
})

const findHousesByAgent = asyncHandler(async (req, res, next) => {
    const houses = await houseService.FindAllHouseByAgent(req.params.agentId)
    res.json(houses)
})

const findHouseBId = asyncHandler(async (req, res, next) => {
    const house = await houseService.FindHouseByid(req.params.id)
    res.json(house)
})

const findHouseBData = asyncHandler(async (req, res, next) => {
    const house = await houseService.FindHouseByData(req.body)
    res.json(house)
})

const createNHouse = asyncHandler(async (req, res, next) => {
    agentId = req.usuario.id
    const newHouse = await houseService.CreateNewHouse(req.body, agentId)
    res.status(201).json(newHouse)
})

const UpdateNHouse = asyncHandler(async (req, res, next) => {
    const updatedHouse = await houseService.UpdateOneHouse(req.params.id, req.body)
    res.json(updatedHouse)
})

module.exports = {
    findHouses,
    findHouseBData,
    findHouseBId,
    findHousesByAgent,
    createNHouse,
    UpdateNHouse
}