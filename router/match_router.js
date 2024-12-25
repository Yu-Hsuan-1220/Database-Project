const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.get("/", (req, res)=>{
    res.render("match.html");
})


router.post("/match/calculate", (req, res)=>{
    const body = req.body;
    console.log(body);
    
})
