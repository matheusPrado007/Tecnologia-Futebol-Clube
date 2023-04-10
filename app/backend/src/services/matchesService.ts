import { ModelStatic } from 'sequelize';
import { IMatches, NewMatch } from '../interfaces';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  constructor(
    private matchesModel:ModelStatic<Matches> = Matches,
  ) {}

  async getAllMatches() {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async inProgress(inProgress: boolean) {
    const matches = await this.matchesModel.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async finish(id: number) {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  async updated({ id, homeTeamGoals, awayTeamGoals }: IMatches) {
    const update = await this.matchesModel
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id, inProgress: true } });
    return update;
  }

  async insert({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: NewMatch) {
    const newMatch = await this.matchesModel
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true });
    return newMatch;
  }
}
