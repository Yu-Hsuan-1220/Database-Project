const express = require("express");
const router = express.Router();
const db = require("../db.js");


router.get("/", (req, res)=>{
    res.render("adduser.html");
})


router.post("/addNewUser", (req, res)=>{
    let body = req.body;
    
    const check_sql = "select * from users where username = ?";
    let check_username = [body["username"]];
    db.query(check_sql, check_username, (err, result)=>{
        if(err){
            console.log(err);
        }
        if(result.length !== 0){
            res.send({"result": "already_exist"});
        }
        else{
            const sql = "insert into users (username, passwd) values(?, ?)";
            let value = [body["username"], body["passwd"]];
            db.query(sql, value, (err, result)=>{
                if(err){
                    console.log(err);
                    res.send({"result" : "fail"});
                }
                else{
                    res.send({"result" : "success"});
                }
            })
        }
    })

    
    

})

module.exports = router;