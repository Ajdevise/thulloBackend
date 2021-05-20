const userRouter = require("./user.routes");
const unsplashRouter = require("./unsplash.routes");
const boardRouter = require("./board.routes");

module.exports = app => {
    app.use("/api/users", userRouter);
    app.use("/api/unsplash", unsplashRouter);
    app.use("/api/boards", boardRouter);
}