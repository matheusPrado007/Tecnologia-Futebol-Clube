import { Router } from 'express';
import { getAllTeams } from '../controllers/teamsController';

const routeTeam = Router();

routeTeam.get('/', getAllTeams);

export default routeTeam;
