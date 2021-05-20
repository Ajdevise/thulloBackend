const express = require("express");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();
const userMiddleware = require("../middleware/user.middleware");

userRouter.post("/", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/profile", userMiddleware.isLoggedIn, userController.profile);
userRouter.get("/:id", userMiddleware.isLoggedIn, userController.getUserById);
userRouter.patch("/:id/edit", userMiddleware.isLoggedIn, userMiddleware.isOwner, userController.editUserProfile);

module.exports = userRouter;