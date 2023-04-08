import { Request, Response, NextFunction } from 'express';
import token from '../auth/authFunctions';
import { IData } from '../interfaces';

const UNAUTHORIZED = 401;

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(UNAUTHORIZED).json({
        message: 'Token not found',
      });
    }
    const payload: IData = token.verifyToken(authorization);
    req.body.data = payload.data;

    return next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({
      message: 'Token must be a valid token',
    });
  }
};

export default validateToken;
