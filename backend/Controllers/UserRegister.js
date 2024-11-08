const {UserAccounts} = require("../Models/userAccounts");

// @Method   GET
// @API      http://localhost:5000/user
async function createUser(req,res){
    try {
        const {userName,userEmail,userPassword,userRole} = req.body;
        const userImage = req.file.path;
        const user = await UserAccounts.create({
            userName:userName,
            userEmail:userEmail,
            userPassword:userPassword,
            userImage:userImage,
            userRole:userRole
        })
    } catch (error) {
        return res.send({error:error.message})
    }
}
