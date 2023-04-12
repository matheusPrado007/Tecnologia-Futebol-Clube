import { Request, Response, NextFunction } from 'express';
import Teams from '../services/teamsService';
import Team from '../database/models/Teams';

const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

const validateTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(UNPROCESSABLE)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const homeTeam = await new Teams(Team).getById(homeTeamId);
  const awayTeam = await new Teams(Team).getById(awayTeamId);
  if (!homeTeam || !awayTeam) {
    return res.status(NOT_FOUND).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default validateTeam;
