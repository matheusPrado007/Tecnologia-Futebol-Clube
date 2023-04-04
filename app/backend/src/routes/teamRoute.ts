import { Router } from 'express';
import { getAllTeams, getTeamById } from '../controllers/teamsController';

const routeTeam = Router();

routeTeam.get('/', getAllTeams);
routeTeam.get('/:id', getTeamById);

export default routeTeam;
