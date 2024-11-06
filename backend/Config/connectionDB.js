const mongoose = require("mongoose");


async function connectionDB(){
    try {
        const connection = mongoose.connect(process.env.DB);
       if(connection) console.log(`MongoDB is connected with server ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
} 

module.exports = {connectionDB}