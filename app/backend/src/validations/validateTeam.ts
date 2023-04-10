import { Request, Response, NextFunction } from 'express';
import { getById } from '../services/teamsService';

const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

const validateTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(UNPROCESSABLE)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const homeTeam = await getById(Number(homeTeamId));
  const awayTeam = await getById(Number(awayTeamId));
  if (!homeTeam || !awayTeam) {
    return res.status(NOT_FOUND).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default validateTeam;
