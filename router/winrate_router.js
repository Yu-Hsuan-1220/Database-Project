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
    res.send({"result" : "incorrectpw"});
})

module.exports = router;