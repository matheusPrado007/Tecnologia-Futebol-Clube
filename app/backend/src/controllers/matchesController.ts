import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

const OK_STATUS = 200;

export default class Matches {
  constructor(private matchesService: MatchesService) {}

  async getMatches(req: Request, res: Response): Promise<object | void> {
    const { inProgress } = req.query;
    if (inProgress) {
      const inProgressBoolean: boolean = (inProgress === 'true');
      const matches = await this.matchesService.inProgress(inProgressBoolean);
      return res.status(OK_STATUS).json(matches);
    }
    const matches = await this.matchesService.getAllMatches();
    return res.status(OK_STATUS).json(matches);
  }

  async finish(req: Request, res: Response): Promise<object | void> {
    const { id } = req.params;
    const finish = await this.matchesService.finish(Number(id) as number);
    return res.status(OK_STATUS).json(finish);
  }
}
