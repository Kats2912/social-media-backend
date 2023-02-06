import express from 'express';
import { createUser, getAllUsers, loginUser } from '../controllers/userController';

const route=express.Router();

route.get('/',getAllUsers);
route.post("/signup/",createUser);
route.post("/login/",loginUser);
export default route;