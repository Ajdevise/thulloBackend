const express = require("express");
const unsplashRouter = express.Router();
const unsplashController = require("../controllers/unsplash.controller");
const userMiddleware = require("../middleware/user.middleware");

unsplashRouter.get('/', userMiddleware.isLoggedIn, unsplashController.getImagesByQueryAndPage);

module.exports = unsplashRouter;