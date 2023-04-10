import { Router } from 'express';
import MatchesService from '../services/matchesService';
import MatchesController from '../controllers/matchesController';
import Matches from '../database/models/Matches';
import validations from '../validations';

const routeMatches = Router();
const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);

routeMatches.get(
  '/',
  (req, res) => matchesController.getMatches(req, res),
);

routeMatches.patch(
  '/:id/finish',
  validations.validateToken,
  (req, res) => matchesController.finish(req, res),
);

routeMatches.patch(
  '/:id',
  validations.validateToken,
  (req, res) => matchesController.updated(req, res),
);

export default routeMatches;
