import * as jwt from 'jsonwebtoken';
import { IData, IToken } from '../interfaces';

const secret = process.env.JWT_SECRET || 'Strogonoff';

const JWT_CONFIG: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '15min',
};

const createToken = (data: IToken) => jwt.sign({ data }, secret, JWT_CONFIG);

const verifyToken = (token: string): IData => jwt.verify(token, secret) as IData;

const token = { createToken, verifyToken };

export default token;
