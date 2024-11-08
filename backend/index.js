const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors")
// Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

// connection with mongo 
const {connectionDB} = require("./Config/connectionDB");

// models 
const {UserAccounts} = require("./Models/userAccounts");


// Controllers 
const {userRoles,
       createRole,
       deleteRole,
       updateRole} = require("./Controllers/UserRoleController");

// Routes 
app.route("/userroles").get(userRoles).post(createRole);
app.route("/user").get().post();


app.route("/userroles/:id").delete(deleteRole).put(updateRole);



// Start server
app.listen(process.env.PORT,function(){
   console.log(`Server is running on ${process.env.PORT}`);
   connectionDB();
});
