const express = require("express");
const router = express.Router();
const db = require("../db.js");


router.get("/", (req, res)=>{
    res.render("winrate.html");
})
router.get("/userWinRate", (req, res) => {
    const username = req.query.username;
    console.log(username);

    // 預設角色及初始勝率為 0
    const roles = ["top", "jungle", "mid", "sup", "ad"];
    const defaultWinRates = roles.reduce((acc, role) => {
        acc[role] = "0.00";
        return acc;
    }, {});

    // 查詢每個角色的勝率
    const sql = `
        SELECT 
            role, 
            ROUND(AVG(is_win) * 100, 2) AS win_rate 
        FROM 
            users_game 
        WHERE 
            username = ? 
        GROUP BY 
            role
    `;

    // 查詢總勝率
    const sql2 = `
        SELECT 
            ROUND(AVG(is_win) * 100, 2) AS total 
        FROM 
            users_game 
        WHERE 
            username = ?
    `;

    // 執行兩個查詢
    db.query(sql, [username], (err, roleWinRates) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Internal Server Error" });
        }

        // 將角色勝率整合到預設值
        roleWinRates.forEach((row) => {
            defaultWinRates[row.role] = `${row.win_rate}`;
        });

        // 查詢總勝率
        db.query(sql2, [username], (err, totalWinRateResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: "Internal Server Error" });
            }

            const totalWinRate = totalWinRateResult[0]?.total ? `${totalWinRateResult[0].total}` : "0";

            // 回傳結果
            res.send({
                total: totalWinRate,
                ...defaultWinRates
            });
        });
    });
});
router.get("/heroWinRates", (req, res) => {
    const username = req.query.username;
    console.log(username);

    // 查詢每個英雄的勝率
    const sql = `
        SELECT 
            hero, 
            ROUND(AVG(is_win) * 100, 2) AS win_rate 
        FROM 
            users_game 
        WHERE 
            username = ? 
        GROUP BY 
            hero
    `;

    db.query(sql, [username], (err, heroWinRates) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Internal Server Error" });
        }

        // 格式化結果
        const result = heroWinRates.map(row => {
            return { [row.hero]: row.win_rate };
        });

        // 回傳結果
        res.send({ result });
    });
});
router.post("/addGameResult", (req, res)=>{
    let body = req.body;
    console.log(body);
    let username = body["username"];
    let passwd = body["passwd"];
    

    const sql_check = "select * from users u where u.username = ? and u.passwd = ?";
    const value = [username, passwd];
    db.query(sql_check, value, (err, result)=>{
        if(err) console.log(err);
        if(result.length === 0){
            res.send({"result" : "incorrectpw"});
        }
        else{
            const insert_sql = "insert into users_game (username, hero, role, is_win) values (?, ?, ?, ?)";
            let value1 = [body["username"], body["hero"], body["lane"]];
            if(body["result"] === "win") value1.push(true);
            else value1.push(false);
            console.log(value1);
            db.query(insert_sql, value1, (err, result)=>{
                if(err) console.log(err);
                else{
                    res.send({"result" : "success"});
                }
            })
            
        }
    })
    
})

module.exports = router;