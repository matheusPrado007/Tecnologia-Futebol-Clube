import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/userService';
import Token from '../auth/authFunctions';

const OK_STATUS = 200;
const UNAUTHORIZED = 401;

export default class Login {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  async getUser(req: Request, res: Response): Promise<object | void> {
    const { email, password } = req.body;

    const user = await this.userService.getEmail(email);
    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: 'Invalid email or password' });
    }
    const pass = bcrypt.compareSync(password, user.password);
    if (!pass) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: 'Invalid email or password' });
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = Token.createToken(userWithoutPassword);

    return res.status(OK_STATUS).json({ token });
  }
}
