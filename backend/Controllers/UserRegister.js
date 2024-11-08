const {UserAccounts} = require("../Models/userAccounts");
const bcrypt = require("bcryptjs")

// @Method   GET
// @API      http://localhost:5000/user
async function CreateUser(req,res){
    try {
        const {userName,userEmail,userPassword,userRole} = req.body;
        const userImage = req.file.path;

        // Username: allows alphabets, numbers, underscores, 3-16 characters
        const userNameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;

        // Email: standard email format
        const userEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if(!userNameRegex.test(userName)){
           return res.status(400).send({"error":"User name can contain only letters"});
        }

        if( !userEmailRegex.test(userEmail)){
            return res.status(400).send({"error":"Invalid email address"});
         }

         if(userPassword.length < 8){
            return res.status(400).send({"error":"Password must be at least 8 characters"});
         }

         if(!userRole){
            return res.status(400).send({"error":"User role must be selected"});
         }
         if(!userImage){
            return res.status(400).send({"error":"User Image must be selected"});
         }
         
         const hashedPassword = await bcrypt.hash(userPassword,10);

         console.log(userImage)
        
        const user = await UserAccounts.create({
            userName:userName,
            userEmail:userEmail,
            userPassword:hashedPassword,
            userImage:userImage,
            userRole:userRole
        });

        if(user){
            return res.status(201).send({"message":"User registered successfully"});
        }else{
            return res.status(500).send({"error":"Failed to register user"});
        }
    } catch (error) {
        return res.send({error:error.message})
    }
}


module.exports = {CreateUser}