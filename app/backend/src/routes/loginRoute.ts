import { Router, Request, Response } from 'express';
import UsersService from '../services/userService';
import Login from '../controllers/loginController';
import Users from '../database/models/Users';
import validations from '../validations';

const routeLogin = Router();
const userService = new UsersService(Users);
const userController = new Login(userService);

routeLogin.post(
  '/',
  validations.validateLogin,
  validations.validateFields,
  (req: Request, res: Response) => userController.getUser(req, res),
);

routeLogin.get(
  '/role',
  validations.validateToken,
  (req: Request, res: Response) => userController.verify(req, res),
);

export default routeLogin;
