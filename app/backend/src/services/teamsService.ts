import Teams from '../database/models/Teams';

export const getAll = async () => {
  const teams = await Teams.findAll();
  return teams;
};

export const createTeams = async () => {
};
