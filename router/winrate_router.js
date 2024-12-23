const express = require("express");
const router = express.Router();
const db = require("../db.js");


router.get("/", (req, res)=>{
    res.render("winrate.html");
})
router.get("/userWinRate", (req, res)=>{
    let username = req.query.username;
    console.log(username);
    res.send({"total" : 52, "top": 42,"jungle": 52 ,"mid" : 62, "sup" : 32, "ad":32})
})
router.get("/heroWinRates", (req, res)=>{
    let username = req.query.username;
    res.send({"result" : [{"艾希" : 18}, {"卡特" : 20}, {"提摩" : 70}]});
})
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