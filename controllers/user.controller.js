const User = require("../models/user.model");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const response = await userService.register(req.body);

    res.status(response.statusCode).json(response.body);
}

const login = async (req, res) => {
    const response = await userService.login(req.body);

    res.status(response.statusCode).json(response.body);
}

const getUserById = async (req, res) => {
    const response = await userService.getUserById(req.params);

    res.status(response.statusCode).json(response.body);
}

const editUserProfile = async (req, res) => {
    const response = await userService.editUserProfile(req.params, req.body);

    res.status(response.statusCode).json(response.body);
}

const profile = async (req, res) => {
    res.json({token: req.token, user: req.user});
}


module.exports = {
    register,
    login,
    profile,
    getUserById,
    editUserProfile
}