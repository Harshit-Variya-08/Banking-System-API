import express from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import generateAcNum from '../utils/generateAcNum.js';
import userModel from '../models/userModel.js';
import validateAuth from '../utils/validation.js';
const router = express.Router();

router.post("/register",(req,resp)=>
{
    const {name, email , password , balance }=req.body;
    const acNum = generateAcNum();
    bcrypt.genSalt(10,(err,salt)=>
    {
        bcrypt.hash(password,salt,async (err,hash)=>
        {
            // console.log(hash);
                const user = await userModel.create({
                        name,
                        email,
                        password: hash,
                        balance,
                        acNum
                        })
        resp.json({"message":"working",data: user});

        })
    })
});

router.post("/login",async(req,resp)=>
{
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(user)
        {
            // resp.json({message : "User Found ", User : user});
            bcrypt.compare(password,user.password,(err,result)=>
            {
                if(!result)
                    {
                         return resp.json({message: "Password not matched.."});
                    }
                let token = jwt.sign({email,name:user.name,id:user._id},"Harshit@8406");    
                resp.json({message: "Login Success" , loginToken : token})
            })
        }
})
router.put("/addBal",validateAuth,async(req,resp)=>
{
    const {bal} = req.body;
    const user = await userModel.findById(req.user.id);
    user.balance= user.balance+bal;
    resp.json({message: "success" , NewBal : user.balance});
    await user.save();
})


export default router;