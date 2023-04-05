import { Request, Response, NextFunction } from 'express';

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(BAD_REQUEST).json({
      message: 'All fields must be filled',
    });
  }
  return next();
};

export const validateFields = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;
  if (!regex.test(email) || password.length < 6) {
    return res.status(UNAUTHORIZED).json({
      message: 'Invalid email or password',
    });
  }
  return next();
};
const validate = { validateLogin, validateFields };

export default validate;
