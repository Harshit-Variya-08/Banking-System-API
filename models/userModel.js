import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Bank_Database").then(()=>
{
    console.log("Mongodb Connected.");
})

const userSchema = mongoose.Schema({
    name: {
        type : String,
        // required : true
    },
    email : {
        type : String,
        // required : true
    },
    password : {
        type : String,
        // required : true
    },
    balance : {
        type : Number,
        default: 0
        // required: true
    },
    acNum : String
})

const userModel = mongoose.model("users",userSchema);
export default userModel;