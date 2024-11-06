
const {UserRoles} = require("../Models/userRoles");
// @Method   GET
// @API      http://localhost:5000/userroles
async function userRoles(req,res){
    const allRoles = await UserRoles.find();
    return res.send(allRoles)
}

// @Method   POST
// @API      http://localhost:5000/userroles
async function createRole(req,res){
    const {roleName,roleStatus} = req.body;

    const roleName_checker = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const roleStatus_checker = /^(active|inactive)$/;

     // Validate roleName
     if (!roleName_checker.test(roleName)) {
        return res.status(400).send({ "error": "Role name cant contain numbers,extra space and special characters." });
    }

    // Validate roleStatus
    if (!roleStatus_checker.test(roleStatus)) {
        return res.status(400).send({ "error": "Invalid Role Status" });
    }
     // Check if role already exists
    const roleExist = await UserRoles.findOne({roleName: roleName.toLowerCase()});
    if (roleExist) {
        return res.status(400).send({ "error": "Role already exists" });
    }

    const newRole = await UserRoles.create({
        roleName:roleName.toLowerCase(),
        roleStatus: roleStatus,
     })
    return res.send({"message":"role added successfully","data":req.body})
}


// @Method   DELETE
// @API      http://localhost:5000/userroles/:id
async function deleteRole(req,res){
    const deleteRole_name = req.params.id.toLowerCase();
    const existingRole = await UserRoles.findOne({roleName:deleteRole_name});
    
    if(existingRole){
        const deleteRole = await UserRoles.deleteOne({roleName:deleteRole_name});
        
        return res.send({"message":"Role Deleted successfully!"})
    }else{

        return res.send("Role not available")
    }
}


// @Method   UPDATE
// @API      http://localhost:5000/userroles/:id
async function updateRole(req,res){
    const {roleName,roleStatus} = req.body;

    const roleName_checker = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const roleStatus_checker = /^(active|inactive)$/;
     // Validate roleName
     if (!roleName_checker.test(roleName)) {
        return res.status(400).send({ "error": "Role name cant contain numbers,extra space and special characters." });
    }

    // Validate roleStatus
    if (!roleStatus_checker.test(roleStatus)) {
        return res.status(400).send({ "error": "Invalid Role Status" });
    }
    const updateRole_name = req.params.id.toLowerCase();
    const existingRole = await UserRoles.findOne({roleName:updateRole_name});

    if (existingRole) {
        const updateRole = await UserRoles.updateOne(
            {roleName:updateRole_name},
            {$set: {roleName:roleName.toLowerCase(), roleStatus: roleStatus}}
            );
            console.log(updateRole)
        return res.send({"message":"Update role successfully"})
    } else {
        
        return res.send("Role not available")
    }
  
}

module.exports = {userRoles,createRole,deleteRole,updateRole}