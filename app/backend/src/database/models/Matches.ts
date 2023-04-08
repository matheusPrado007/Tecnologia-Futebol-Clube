import { BOOLEAN, Model, INTEGER } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  declare readonly id: number;
  declare homeTeamid: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare isProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    field: 'home_team_id',
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    field: 'home_team_goals',
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    field: 'away_team_id',
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    field: 'in_progress',
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeMatch' });
Matches.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayMatch' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
