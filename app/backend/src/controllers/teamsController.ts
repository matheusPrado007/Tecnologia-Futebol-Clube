import { Request, Response } from 'express';
import { getAll } from '../services/teamsService';

const OK = 200;

export const getAllTeams = async (req: Request, res: Response) => {
  const teams = await getAll();
  return res.status(OK).json(teams);
};

export const createTeams = async () => {
};
