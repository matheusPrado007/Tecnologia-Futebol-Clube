import { Router, Request, Response } from 'express';
import UsersService from '../services/userService';
import Login from '../controllers/loginController';
import Users from '../database/models/Users';
import { validateLogin, validateFields } from '../validations/validateLogin';

const routeLogin = Router();
const userService = new UsersService(Users);
const userController = new Login(userService);

routeLogin.post(
  '/',
  validateLogin,
  validateFields,
  (req: Request, res: Response) => userController.getUser(req, res),
);

export default routeLogin;
