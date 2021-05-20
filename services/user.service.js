const utilsService = require("../utils/utils.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const User = require("../models/user.model");
const mongoose = require("mongoose");

const register = async (body) => {
    try {
        const { username, email, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email, 
            password: hashedPassword
        })
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '5h' });

        const savedUser = await user.save();
        savedUser.password = undefined;

        return utilsService.generateResponse(200, { token, user: savedUser });
    } catch(e) {
        return utilsService.generateResponse(400, { message: e.message });
    }
}

const login = async (body) => {
    try {
        const { email, password } = body;
        const user = await User.findByCredentials(email, password);
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '2h' });

        user.password = undefined;
        return utilsService.generateResponse(200, { token, user });
    } catch(e) {
        return utilsService.generateResponse(400, { message: e.message });
    }
}

const getUserById = async (params) => {
    try {
        const { id } = params;
        const user = await User.findById(id);
        
        if(!user) {
            throw new Error("User not found");
        }

        user.password = undefined;
        return utilsService.generateResponse(200, {user});
    } catch(e) {
        return utilsService.generateResponse(400, { message: e.message })
    }
}

const editUserProfile = async (params, body) => {
    try {
        const _id = params.id;
        const user = await User.findById(_id);


        if(body.image) {
            let image = await cloudinary.uploader.upload(body.image);
            body.image = image.url;
        }

        for(const key in body) {
            if(body[key]) {
                user[key] = body[key];
            }
        }

        await user.save();
        user.password = undefined;
        return utilsService.generateResponse(200, {user});
    } catch(e) {
        console.log("error: " + e);
        return utilsService.generateResponse(400, {message: e.message});
    }
}


module.exports = {
    register,
    login,
    getUserById,
    editUserProfile
}