const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.get("/", (req, res)=>{
    res.render("heroData.html");
})

router.get("/hero", (req, res)=>{
    const season = req.query.season;
    const hero = req.query.hero;
    const checkTableSQL = `SHOW TABLES LIKE '${season}'`;

    db.query(checkTableSQL, (err, tables) => {
        if (err) {
            console.error("Error checking table:", err);
            return res.status(500).send({ result: "ServerError" });
        }

        if (tables.length === 0) {
            console.log("noTable");
            return res.send({ result: "NoData" });
        }
        const querySQL = `
            SELECT 
            name, role, tier, score, win_rate, pick_rate, ban_rate, kda 
            FROM ${season} 
            WHERE name = ?
        `;

        db.query(querySQL, [hero], (err, result) => {
            if (err) {
                console.error("Error querying hero data:", err);
                return res.status(500).send({ result: "ServerError" });
            }

            if (result.length === 0) {
                console.log("noData");
                return res.send({ result: "NoData" });
            }

            // 返回查詢結果
            console.log(result);

            res.send({ "result" : result });
        });
    });
})

module.exports = router;