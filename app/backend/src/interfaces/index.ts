export interface ITeam {
  id: number;
  teamName: string;
}
export interface IToken {
  id: number;
  username: string;
  role: 'user' | 'admin';
  email: string;
}

export interface IData {
  data: IToken,
  iat: number,
  exp:number
}

export interface IUser {
  id: number;
  username: string;
  role: 'user' | 'admin',
  email: string;
  password: string;
}
