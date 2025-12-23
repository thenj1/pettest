const userService = require('./userservice');
const asyncHandler = require('../utils/trycatchhandler');

const findAgents = asyncHandler(async (req, res, next) => {
    const agents = await userService.FindAllUsers()
    res.json(agents)
});

const findAgentId = asyncHandler(async (req, res, next) => {
    const agent = await userService.FindUserById(req.params.id);
    res.json(agent)
});

const findAgentByData = asyncHandler(async (req, res, next) => {
    const agent = await userService.FindUserByData(req.body);
    res.json(agent)
})

const createNewAgent = asyncHandler(async (req, res, next) => {
    const newAgent = await userService.CreateNewUser(req.body);
    res.status(201).json(newAgent)
})

const loginAgent = asyncHandler(async (req, res, next) => {
    const { token, agent } = await userService.login(req.body);
    res.json({
        message: "Agente logado",
        token,
        agent: user
    })
})

module.exports = {
    findAgents,
    findAgentId,
    findAgentByData,
    createNewAgent,
    loginAgent
}