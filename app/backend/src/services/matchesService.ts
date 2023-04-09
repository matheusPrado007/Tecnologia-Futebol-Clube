import { ModelStatic } from 'sequelize';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  constructor(
    private matchesModel:ModelStatic<Matches>,
  ) {}

  async getAllMatches(inProgress: string | undefined) {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    if (inProgress) {
      return matches.filter((match) => match.isProgress === true);
    }

    return matches;
  }
}
