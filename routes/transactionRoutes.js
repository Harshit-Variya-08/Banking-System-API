import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateAuth from "../utils/validation.js";
import transactionModel from "../models/transactionModel.js";
import userModel from "../models/userModel.js";

const router = express.Router();
router.post("/transfer",validateAuth,async(req,resp)=>
{
    const {email, amount} = req.body;
    let Transfer_amount = Number(amount);
    console.log(req.body);
    // 1 . Finding Receiver
    const receiver = await userModel.findOne({email});
    if(!receiver)
        {
            return resp.json({error :"Error in fetching Receiver Details"});
        }

    // 2. Finding Sender
    const sender = await userModel.findById(req.user.id);

    // 3. Prevent Self Transfer
        if(sender._id.toString() === receiver._id.toString())
            {
                return resp.json({error : "Can't transfer to yourself"});
            }


    sender.balance= sender.balance-Transfer_amount;
    receiver.balance = receiver.balance+Transfer_amount;
    await sender.save();
    await receiver.save();

    await transactionModel.create({
        sender:sender._id,
        receiver : receiver._id,
        amount : Transfer_amount 
    })
    resp.json({message: `transer success ,$${amount} has been transfer to ${receiver.name} ` , Avl_Bal : sender.balance});
})

router.get("/history",validateAuth,async(req,resp)=>
{
  const transactions = await transactionModel
    .find({
      $or: [{ sender: req.user.id }, { receiverId: req.user.id }],
    })
    .select("-__v")
    .populate("sender", "email -_id")
    .populate("receiver", "email -_id");

    resp.json({All_transaction: transactions});
})
export default router;