'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeamId: {
        field: 'home_team_id',
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "teams",
          key: "id"
        },
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        type: Sequelize.INTEGER
      },
      awayTeamId: {
        field: 'away_team_id',
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "teams",
          key: "id"
        },
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        type: Sequelize.INTEGER
      },
      inProgress: {
        field: 'in_progress',
        type: Sequelize.BOOLEAN
      },
    });

  },

  down: async (queryInterface, _Sequelize) => {

    await queryInterface.dropTable('matches');

  }
};
