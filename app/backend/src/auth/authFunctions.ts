import * as jwt from 'jsonwebtoken';
import IToken from '../interfaces/IToken';

const secret = process.env.JWT_SECRET || 'Strogonoff';

const JWT_CONFIG: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '15min',
};

const createToken = (data: IToken) => jwt.sign({ data }, secret, JWT_CONFIG);

// const verifyToken = (token) => jwt.verify(token, secret);

const token = { createToken };

export default token;
