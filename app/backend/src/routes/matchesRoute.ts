import { Router } from 'express';
import MatchesService from '../services/matchesService';
import MatchesController from '../controllers/matchesController';
import Matches from '../database/models/Matches';

const routeMatches = Router();
const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);

routeMatches.get(
  '/',
  (req, res) => matchesController.getMatches(req, res),
);

export default routeMatches;
