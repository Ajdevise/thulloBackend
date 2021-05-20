const jwt = require("jsonwebtoken");
const utilsService = require("../utils/utils.service");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const isLoggedIn = async (req, res, next) => {
    try {
        const token = utilsService.getToken(req);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;
        const user = await User.findById(id);

        req.user = user;
        req.token = token;
        next();
    } catch(e) {
        res.status(401).json({message: e});
    }
}

const isOwner = async (req, res, next) => {
    try {
        if(req.user._id.toString() === req.params.id) {
            next();
        } else {
            throw new Error("You are not authorized to do this");
        }
    } catch(e) {
        res.status(401).json({ message: e.message });
    }
}

module.exports = {
    isLoggedIn,
    isOwner
}