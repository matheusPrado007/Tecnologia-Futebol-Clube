import Matches from '../database/models/Matches';

export interface ITeam {
  id?: number;
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

export interface IMatches {
  id?: number | string,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface NewMatch {
  homeTeamId: number | string,
  awayTeamId: number | string,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
export interface IId {
  homeTeamId: number,
  awayTeamId: number,
}

export interface IMatchesHome extends Matches {
  homeTeam: {
    id: number,
    teamName: string,
  }
}
