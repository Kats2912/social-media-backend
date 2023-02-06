import express from "express";
import { createBlogs, deleteBlog, getAllBlogs, getByUserId, getSingleBlog, updateBlog } from "../controllers/blogController";
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/createBlog/",createBlogs);
blogRouter.post("/updateBlog/:id",updateBlog);
blogRouter.post("/:id",getSingleBlog);
blogRouter.post("/:id",deleteBlog);
blogRouter.get("/user/:id",getByUserId);
export default blogRouter