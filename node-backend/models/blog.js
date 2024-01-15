const {Schema, model} = require("mongoose")
const {createHmac , randomBytes} = require("crypto");

const blogSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true,
    },
    blogImage : {
        type : String,
        required : false,
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
},{timestamps: true})


const Blog = model("blog", blogSchema);


module.exports = Blog;