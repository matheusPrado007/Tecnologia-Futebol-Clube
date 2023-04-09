import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

const OK_STATUS = 200;

export default class Matches {
  constructor(private matchesService: MatchesService) {}

  async getMatches(req: Request, res: Response): Promise<object | void> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getAllMatches(inProgress as string | undefined);
    return res.status(OK_STATUS).json(matches);
  }
}
