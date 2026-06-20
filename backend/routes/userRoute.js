import express from 'express';
import { loginUser, registerUser, adminLogin, getCurrentUser, getCart, updateCart } from '../controllers/userControllers.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/me', userAuth, getCurrentUser);

userRouter.get('/cart', userAuth, getCart);

userRouter.post('/cart', userAuth, updateCart);

export default userRouter;