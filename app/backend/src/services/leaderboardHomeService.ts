import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import homeQuery from '../utils/db/homeQuery';
import { IMatchesHome } from '../interfaces';

export default class LeaderboardHomeService {
  static async getHomeLeaderBoard(): Promise<IMatchesHome[]> {
    const homeLeaderBoard = await sequelize.query(homeQuery, { type: QueryTypes.SELECT });
    return homeLeaderBoard as IMatchesHome[];
  }
}
