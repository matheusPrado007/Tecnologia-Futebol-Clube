import { Request, Response } from 'express';
import { getAll, getById } from '../services/teamsService';

const OK = 200;

export const getAllTeams = async (req: Request, res: Response) => {
  const teams = await getAll();
  res.status(OK).json(teams);
};

export const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await getById(Number(id));
  res.status(OK).json(team);
};
