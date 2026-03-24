import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Bank_Database").then(()=>
{
    console.log("Mongodb Connected.");
})

const userSchema = mongoose.Schema({
    name: String,
    email : String,
    password : String,
    balance : Number,
    acNum : String
})

const userModel = mongoose.model("users",userSchema);
export default userModel;