import {User} from '../Models/User.js';
export const userDetails=async (req,res)=>{
    const email=req.params.email;
    const details=await User.findOne({email:email});
    res.json(details);
}