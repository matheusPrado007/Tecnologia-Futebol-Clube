import { Request, Response } from 'express';
import LeaderboardHomeSevice from '../services/leaderboardHomeService';

const OK = 200;

export default class LeaderboardController {
  static async getAllHome(_req: Request, res: Response) {
    const leaderboard = await LeaderboardHomeSevice.getHomeLeaderBoard();
    return res.status(OK).json(leaderboard);
  }
}
