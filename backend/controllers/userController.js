import User from "../model/User";

export const getAllUsers = async (req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }
    catch(err){
console.log(err);
    }
    if(!users)res.status(404).json({message:"No user found"});
    else res.status(201).json(users);
};

export const createUser = async (req,res,next)=>{
    const {name,email,password,} = req.body;
    let existuser;
    try{
        existuser = await User.findOne({email});
    }
    catch(err){
        console.log(err);
    }
    if(existuser){
        return res.status(400).json({message:"User already exists"});
    }
    const user = new User({
        name,
        email,
        password,
        blogs:[],
    })
    try{
        await user.save();
    }
    catch(err){
        console.log(err);
    }

    return res.status(200).json({user});

};

export const loginUser = async(req,res,next)=>{
    const {email,password}=req.body;
    let existuser;
    try{
        existuser = await User.findOne({email});
    }
    catch(err){
        console.log(err);
    }
    if(!existuser){
        return res.status(400).json({message:"No user found with such email"});
    }
    const pass = existuser.password;
    if(pass==password)return res.status(201).json({message:"User login successfull"});
    else return res.status(404).json({message:"Invalid Password"});
}