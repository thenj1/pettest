const inspectionService = require('./inspectionservice');
const asyncHandler = require('../utils/trycatchhandler');

const findInspections = asyncHandler(async (req, res, next) => {
    const inspections = await inspectionService.findAllInspection();
    res.json(inspections)
})

const findInspectionBId = asyncHandler(async (req, res, next) => {
    const inspection = await inspectionService.findInspectionById(req.params.id);
    res.json(inspection)
})

const findInspectionBData = asyncHandler(async (req, res, next) => {
    const inspection = await inspectionService.findInspectionByData(req.body);
    res.json(inspection)
})

const getInspectionsByHouse = asyncHandler(async (req, res, next) => {
    const history = await inspectionService.getHistoryByHouse(req.params.houseId);
    res.json(history)
})

const createNInspection = asyncHandler(async (req, res, next) => {
    const newInspection = await inspectionService.createNewInspection(req.body, req.usuario.id);
    res.status(201).json(newInspection)
})

module.exports = {
    findInspections,
    findInspectionBId,
    findInspectionBData,
    getInspectionsByHouse,
    createNInspection
}