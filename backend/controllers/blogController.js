import mongoose from "mongoose";
import User from "../model/User";
import Blog from "../model/Blog";

export const getAllBlogs = async(req,res,next)=>{
    let blogs;
    try{
        blogs=await Blog.find();
    }
    catch(err){
console.log(err);
    }
    if(!blogs)res.status(404).json({message:"No blogs found"});
    else res.status(201).json(blogs);
}

export const createBlogs = async(req,res,next)=>{
    const {title,description,image,user} = req.body;
    let existUser;
    try{
        existUser=await User.findById(user);
    }
    catch(err){
        console.log(err);
    }
    if(!existUser)return res.status(404).json({message:"Unable to find user with this id"});
    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try{
        const session =await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existUser.blogs.push(blog);
        await existUser.save({session});
        session.commitTransaction();
    }
    catch(err){
        console.log(err);
    }
    return res.status(200).json({blog});
}

export const updateBlog = async(req,res,next)=>{
    const {title,description} = req.body
    const blogId = req.params.id;
    let blog;
    try{
         blog = await Blog.findByIdAndUpdate(blogId,{
            title,description,
        }
        )
    }
    catch(err){
        console.log(err);
    }
    if(!blog)return res.status(404).json({
        message:"Blog does not exist",
    })
    return res.status(202).json({blog});
}

export const getSingleBlog = async(req,res,next)=>{
    const blogId = req.params.id;
    let blog;
    try{
        blog =await Blog.findById(blogId);
    }
    catch(err){
        console.log(err);
    }
    if(!blog)return res.status(404).json({message:"Blog not found"});
    return res.status(202).json({blog});
}

export const deleteBlog = async(req,res,next)=>{
    const blogId = req.params.id;
    let blog;
    try{
        blog =await Blog.findByIdAndRemove(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch(err){
        console.log(err);
    }
    if(!blog)return res.status(404).json({message:"Blog not found"});
    //blog.delete();
    return res.status(202).json({message:"Blog deleted"});
}

export const getByUserId = async(req,res,next)=>{
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate('blogs');

    }
    catch(err){
        console.log(err);
    }
    if(!userBlogs)return res.status(404).json({message:"No Blog found"});
    return res.status(202).json({blogs:userBlogs});
}