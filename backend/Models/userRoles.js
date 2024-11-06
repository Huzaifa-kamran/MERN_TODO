const mongoose = require("mongoose");

const userRolesModel = mongoose.Schema(
    {
        roleName:{
            type:String,
            required:[true,"Role Name must be filled"]
        },
        roleStatus:{
            type:String,
            required:[true,"Role Status must be filled"],
        },
      
    }
    );

    const UserRoles = mongoose.model("UserRoles", userRolesModel);
    module.exports = {UserRoles}