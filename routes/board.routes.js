const express = require("express");
const boardController = require("../controllers/board.controller");
const boardRouter = express.Router();
const userMiddleware = require("../middleware/user.middleware");

boardRouter.post("/", userMiddleware.isLoggedIn, boardController.createBoard);
boardRouter.get("/", userMiddleware.isLoggedIn, boardController.getBoardsOfCurrentlyLoggedUser);


module.exports = boardRouter;