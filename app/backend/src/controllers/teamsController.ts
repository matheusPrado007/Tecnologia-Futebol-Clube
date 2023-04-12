import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

const OK_STATUS = 200;

export default class TeamController {
  private service: TeamService;

  constructor(service: TeamService) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response) {
    const teams = await this.service.getAll();
    return res.status(OK_STATUS).json(teams);
  }

  async getId(req: Request, res: Response) {
    const { id } = req.params;
    const teamsId = await this.service.getById(id);

    return res.status(OK_STATUS).json(teamsId);
  }
}
