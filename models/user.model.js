const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 30,
        trim: true,
        required: true
    }, 
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Not an email");
            }
        }
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 512,
        trim: true,
        required: true
    },
    bio: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    boards: [
        { 
            _id: false, type: mongoose.Schema.Types.ObjectId, ref: 'Board' 
        }
    ]
})

userSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({email});

    if(!user) {
        throw new Error("There is no user with that email");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Invalid password");
    }

    return user;
}

const User = mongoose.model("User", userSchema);

module.exports = User;