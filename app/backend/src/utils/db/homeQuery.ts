const homeQuery = `
SELECT
    teams.team_name AS name,
    COUNT(*) AS totalGames,
    SUM(
      CASE
        WHEN matches.home_team_goals > matches.away_team_goals THEN 3
        WHEN matches.home_team_goals = matches.away_team_goals THEN 1
        ELSE 0
      END
    ) AS totalPoints,
    SUM(
        CASE
          WHEN matches.home_team_goals > matches.away_team_goals THEN 1
          ELSE 0
        END
    ) AS totalVictories,
    SUM(
        CASE
            WHEN matches.home_team_goals = matches.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalDraws,
    SUM(
        CASE
            WHEN matches.home_team_goals < matches.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalLosses,
    SUM(matches.home_team_goals) AS goalsFavor,
    SUM(matches.away_team_goals) AS goalsOwn,
    SUM(matches.home_team_goals - matches.away_team_goals) AS goalsBalance,
    ROUND(
        (SUM(
            CASE
                WHEN matches.home_team_goals > matches.away_team_goals THEN 3
                WHEN matches.home_team_goals = matches.away_team_goals THEN 1
                ELSE 0
            END
        ) / (COUNT(matches.id) * 3)) * 100, 2
    ) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS teams
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS matches
ON teams.id = matches.home_team_id
WHERE matches.in_progress = false
GROUP BY teams.id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

export default homeQuery;
