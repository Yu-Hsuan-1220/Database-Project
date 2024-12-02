const express = require("express");
const router = express.Router();
const db = require("../db.js");
router.get("/", (req, res)=>{
    res.render("evaluation.html");
})

router.post("/data", (req, res)=>{
    let body = req.body;
    const sql = "insert into hero_evaluation (hero, role, rate) values (?, ?, ?)";
    let value = [];
    value.push(body["hero"]);
    value.push(body["role"]);
    value.push(Number(body["rate"]));
    db.query(sql, value, (err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({ message: '資料插入失敗' });
        }
    })
    res.send({"message" : "成功"});
    //console.log(body);
})
router.get("/data", (req, res)=>{
    let role = req.query.role;
    //console.log(role);
    
    const sql = "select * from hero_evaluation h where h.role = ?" ;
    db.query(sql, role ,(err, result)=>{
        if(err){
            console.log(err);
        }
        res.json({"result" : result});
        console.log(result);
    })
})
router.put("/data/:id", (req, res)=>{
    let id = Number(req.params.id);
    let payload = req.body;
    let sql = "select count(*) as cnt from hero_evaluation h where h.ID = ?";
    let respond = {};
    db.query(sql, id, (err, result)=>{
        if(err) console.log(err);
        if(result[0]["cnt"] === 0){
            respond = {"result" : "fail"};
        }
        else{
            respond = {"result" : "success"};
            sql = "update hero_evaluation h set role = ?, rate = ? where h.ID = ?";
            let value = [payload["role"], payload["rate"], id];
            db.query(sql, value, (err, result)=>{
                if(err) console.log(err);
            })
        }
        res.json(respond);
    })
})
router.delete("/data/:id", (req, res)=>{
    let id = Number(req.params.id);
    let sql = "select count(*) as cnt from hero_evaluation h where h.ID = ?";
    let respond = {};
    db.query(sql, id, (err, result)=>{
        if(err) console.log(err);
        if(result[0]["cnt"] === 0){
            respond = {"result" : "fail"};
        }
        else{
            respond = {"result" : "success"};
            sql = "delete from hero_evaluation where ID = ?";
            db.query(sql, id, (err, result)=>{
                if(err) console.log(err);
            })
        }
        res.json(respond);
    })
    
    
    
})

module.exports = router;

