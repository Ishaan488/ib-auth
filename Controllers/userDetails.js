import {User} from '../Models/User.js';
export const userDetails=async (req,res)=>{
    const username=req.params.username;
    const details=await User.findOne({username:username});
    res.json(details);
}