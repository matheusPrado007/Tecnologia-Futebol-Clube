import { ITeam } from '../interfaces/ITeams';
import Teams from '../database/models/Teams';

export const getAll = async (): Promise<ITeam[]> => {
  const teams = await Teams.findAll();
  return teams as ITeam[];
};

export const getById = async (id: number): Promise<ITeam> => {
  const team = await Teams.findByPk(id);
  return team as ITeam;
};
