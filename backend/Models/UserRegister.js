const mongoose = require("mongoose");

const UserAccountModel = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User Name must be filled"]
    },
    userEmail: {
        type: String,
        required: [true, "User Email must be filled and valid email"],
    },
    userAge: {
        type: Number,
        required: [true, "User Age must be filled"],
    },
    userPassword: {
        type: String,
        required: [true, "User Password must be there and contains at least 8 characters"]
    },
});


const UserAccount = mongoose.model("UserAccount", UserAccountModel);

module.exports = UserAccount;