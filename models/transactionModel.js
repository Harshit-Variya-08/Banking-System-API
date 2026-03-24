import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    amount : Number
});

const transactionModel = mongoose.model("transactions",transactionSchema);
export default transactionModel;