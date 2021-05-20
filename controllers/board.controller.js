const boardService = require("../services/board.service");

const createBoard = async (req, res) => {
    const response = await boardService.createBoard(req.user, req.body);

    res.status(response.statusCode).json(response.body);
} 

const getBoardsOfCurrentlyLoggedUser = async (req, res) => {
    const response = await boardService.getBoardsOfCurrentlyLoggedUser(req.user);

    res.status(response.statusCode).json(response.body);
}

module.exports = {
    createBoard,
    getBoardsOfCurrentlyLoggedUser
}