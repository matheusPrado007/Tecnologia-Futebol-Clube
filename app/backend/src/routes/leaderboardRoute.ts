import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/home', (req: Request, res: Response) => LeaderboardController
  .getAllHome(req, res));

export default leaderboardRoute;
