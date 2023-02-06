import express from 'express';
import mongoose from 'mongoose';
const app=express();
import route from './routes/userRoutes';
import blogRouter from './routes/blogRoutes';
app.use(express.json());
app.use("/api/user/",route);
app.use("/api/blog/",blogRouter);
mongoose.connect("mongodb://0.0.0.0:27017/BlogApp").then(()=>{app.listen(5000)}).then(()=>{
    console.log("mongodb connected")
}).catch((err)=>{
    console.log(err);
})



  