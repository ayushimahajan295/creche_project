import express from 'express';
import { loginUser ,signupUser,adminLogin} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/signup', signupUser);
userRouter.post('/admin', adminLogin);

export default userRouter;
