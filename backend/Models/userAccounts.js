const mongoose = require("mongoose");

const userAcountsModel = mongoose.Schema(
    {
        userName:{
            type:String,
            required:[true,"User Name must be filled"]
        },
        userEmail:{
            type:String,
            required:[true,"User Email must be filled"],
        },
        userPassword:{
            type:String,
            required:[true,"User Password must be there and contains at least 8 characters"]
        },
        userImage:{
            type:String,
            required:false
        }
    }
    );

    module.exports = mongoose.model("UserAccounts", userAcountsModel);