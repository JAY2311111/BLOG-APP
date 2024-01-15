const mongoose = require("mongoose")

const url = "mongodb://127.0.0.1:27017/blogapp"

const connectToMongoDB = () =>{
    mongoose.connect(url)
        .then(client => {
            console.log("Mongodb is Connected")
        })
        .catch(err => {
            console.log(err)
        })
}



module.exports = connectToMongoDB;