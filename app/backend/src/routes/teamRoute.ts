import { Request, Response, Router } from 'express';
import Team from '../database/models/Teams';
import TeamService from '../services/teamsService';
import TeamController from '../controllers/teamsController';

const routeTeam = Router();
const service = new TeamService(Team);
const controller = new TeamController(service);

routeTeam.get('/:id', (req: Request, res: Response) => controller.getId(req, res));

routeTeam.get('/', (req: Request, res: Response) => controller.getAll(req, res));

export default routeTeam;
