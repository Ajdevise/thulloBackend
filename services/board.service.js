const utilsService = require("../utils/utils.service");
const Board = require("../models/board.model");

const createBoard = async (user, boardData) => {
  try {
    const { title, description, cover, visibility } = boardData;
    const board = new Board({
      title,
      description,
      cover, 
      visibility,
      owner: user._id
    })

    board.members.push(user._id);
    await board.save();
    user.boards.push(board._id);
    await user.save();
    
    return utilsService.generateResponse(200, { board });
  } catch(e) {
    return utilsService.generateResponse(400, { message: e.message });
  }
}

const getBoardsOfCurrentlyLoggedUser = async (user) => {
  try {
    await user.populate("boards").execPopulate();
    await user.populate("boards.members", "-_id -password -boards").execPopulate();
    user.password = undefined;
    return utilsService.generateResponse(200, { boards: user.boards });
  } catch(e) {
    return utilsService.generateResponse(400, { message: e.message })
  }
}

module.exports = {
  createBoard,
  getBoardsOfCurrentlyLoggedUser
}