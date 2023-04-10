import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

const OK_STATUS = 200;
const CREATED = 201;

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

  async updated(req: Request, res: Response): Promise<object | void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const update = await this.matchesService
      .updated({ id, homeTeamGoals, awayTeamGoals });
    return res.status(OK_STATUS).json(update);
  }

  async insert(req: Request, res: Response): Promise<object | void> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const newMatch = await this.matchesService
      .insert({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });
    return res.status(CREATED).json(newMatch);
  }
}
