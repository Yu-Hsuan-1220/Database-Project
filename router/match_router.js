const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.get("/", (req, res) => {
    res.render("match.html");
})

router.get("/calculate", (req, res) => {
    const type = req.query.type;
    if (type === "dragon") {
        res.send({ "result": 67.90 });
    }
    else if (type === "tower") {
        res.send({ "result": 71.30 })
    }
    else if (type === "nexus") {
        res.send({ "result": 100 });
    }
    else if (type === "inhib") {
        res.send({ "result": 91 });
    }
    else if (type === "baron") {
        res.send({ "result": 81.05 });
    }
    res.send({ "result": 0.00 });
})

router.post("/analyze", async (req, res) => {
    const body = req.body;
    const hero = body["champion"];
    const role = body["position"];
    const value = [hero, role, role];
    const sql = `
WITH HeroData AS (
    SELECT
        p.matchid,
        p.heroid AS given_hero_id,
        p.id AS participant_id
    FROM
        participants p
    JOIN
        champ c ON p.heroid = c.id
    WHERE
        c.name = ?
        AND p.role = ?
),
MatchupStats AS (
    SELECT
        h.given_hero_id AS hero_a,
        p2.heroid AS hero_b,
        COUNT(*) AS total_matches,
        SUM(CASE WHEN s.win = 1 THEN 1 ELSE 0 END) AS hero_a_wins
    FROM
        HeroData h
    JOIN
        participants p2 ON h.matchid = p2.matchid AND p2.role = ?
    JOIN
        states s ON h.participant_id = s.id
    WHERE
        p2.id != h.participant_id
    GROUP BY
        h.given_hero_id, p2.heroid
),
WinRates AS (
    SELECT
        hero_a,
        hero_b,
        total_matches,
        hero_a_wins,
        (hero_a_wins * 1.0 / total_matches) AS win_rate
    FROM
        MatchupStats
    WHERE
        total_matches >= 100
),
HeroDetails AS (
    SELECT
        w.hero_a,
        w.hero_b,
        c.name AS opponent_name,
        w.total_matches,
        w.hero_a_wins,
        w.win_rate
    FROM
        WinRates w
    JOIN
        champ c ON w.hero_b = c.id
)
(
    SELECT
        hero_a,
        opponent_name,
        total_matches,
        win_rate
    FROM
        HeroDetails
    ORDER BY
        win_rate DESC
    LIMIT 5
)
UNION ALL
(
    SELECT
        hero_a,
        opponent_name,
        total_matches,
        win_rate
    FROM
        HeroDetails
    ORDER BY
        win_rate ASC
    LIMIT 5
);
    `;
    db.query(sql, value, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({ "result": result });
    })
})

router.post("/1v1", async (req, res) => {
    const body = req.body;
    const hero1 = body["hero1"];
    const hero2 = body["hero2"];
    const value = [hero1, hero2, hero1, hero2];
    const sql = `
        WITH HeroData AS (
            SELECT
                p.matchid,
                p.heroid,
                p.id AS participant_id,
                s.win
            FROM
                participants p
            JOIN
                champ c ON p.heroid = c.id
            JOIN
                states s ON p.id = s.id
            WHERE
                c.name IN (?, ?)
        ),
        Matchups AS (
            SELECT
                h1.matchid,
                h1.heroid AS hero_1_id,
                h1.win AS hero_1_win,
                h2.heroid AS hero_2_id
            FROM
                HeroData h1
            JOIN
                HeroData h2 ON h1.matchid = h2.matchid AND h1.heroid != h2.heroid
            WHERE
                h1.heroid IN (
                    SELECT id FROM champ WHERE name = ?
                )
                AND h2.heroid IN (
                    SELECT id FROM champ WHERE name = ?
                )
        ),
        WinRate AS (
            SELECT
                COUNT(*) AS total_matches,
                SUM(CASE WHEN m.hero_1_win = 1 THEN 1 ELSE 0 END) * 1.0 / COUNT(*) AS hero_1_win_rate
            FROM
                Matchups m
        )
        SELECT
            hero_1_win_rate * 100 AS hero_1_win_rate_percentage
        FROM
            WinRate;
    `
    db.query(sql, value, (err, result) => {
        if (err) console.log(err);
        let winrate = result[0]["hero_1_win_rate_percentage"];
        res.send({ "result": winrate });
    })
})

router.post("/5v5", async (req, res) => {
    const body = req.body;
    const blue = body["blue_team"];
    const red = body["red_team"];
    const value = [];
    for (let i = 0; i < 5; i++) {
        value.push(blue[i]);
    }
    for (let i = 0; i < 5; i++) {
        value.push(red[i]);
    }
    const qry = `
        WITH TeamData AS (
            SELECT
                p.matchid,
                CASE WHEN p.player <= 5 THEN 100 ELSE 200 END AS teamid
            FROM
                participants p
            JOIN
                champ c ON p.heroid = c.id
            WHERE
                c.name IN (?, ?, ?, ?, ?)
            GROUP BY
                p.matchid, teamid
            HAVING
                COUNT(DISTINCT p.heroid) = 5
        ),
        OpponentTeamData AS (
            SELECT
                p.matchid,
                CASE WHEN p.player <= 5 THEN 100 ELSE 200 END AS teamid
            FROM
                participants p
            JOIN
                champ c ON p.heroid = c.id
            WHERE
                c.name IN ( ?, ?, ?, ?, ?)
            GROUP BY
                p.matchid, teamid
            HAVING
                COUNT(DISTINCT p.heroid) = 5
        ),
        ValidMatches AS (
            SELECT
                t.matchid,
                t.teamid AS team_1_id,
                o.teamid AS team_2_id
            FROM
                TeamData t
            JOIN
                OpponentTeamData o ON t.matchid = o.matchid AND t.teamid != o.teamid
        ),
        WinRate AS (
            SELECT
                COUNT(*) AS total_matches,
                SUM(CASE 
                    WHEN s.win = 1 AND (CASE WHEN p.player <= 5 THEN 100 ELSE 200 END) = vm.team_1_id THEN 1 
                    ELSE 0 
                END) AS team_1_wins
            FROM
                ValidMatches vm
            JOIN
                participants p ON vm.matchid = p.matchid
            JOIN
                states s ON p.id = s.id
            WHERE
                (CASE WHEN p.player <= 5 THEN 100 ELSE 200 END) = vm.team_1_id
        )
        SELECT
            (team_1_wins * 1.0 / total_matches) * 100 AS team_1_win_rate_percentage
        FROM
            WinRate;
    `
    db.query(qry, value, (err, result) => {
        if (err) console.log(err);
        const winrate = result[0]["team_1_win_rate_percentage"];
        res.send({ "result": winrate });
    })
})

router.get("/objective", async (req, res) => {
});

module.exports = router;