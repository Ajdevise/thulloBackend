const unsplashService = require("../services/unsplash.service");

const getImagesByQueryAndPage = async (req, res) => {
    const response = await unsplashService.getImagesByQueryAndPage(req.query.query, req.query.page);

    res.status(response.statusCode).json(response.body);
}

module.exports = {
    getImagesByQueryAndPage
}