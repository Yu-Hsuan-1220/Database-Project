const express = require("express");
const app = express();
const port_num = 8088;
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const evaluationRouter = require("./router/evaluation");
const winrateRouter = require("./router/winrate_router");
const adduserRouter = require("./router/adduser_router");
const heroDataRouter = require("./router/heroData_router");
const matchRouter = require("./router/match_router");
const db = require('./db');

app.engine("html", hbs.__express);

app.set("views", path.join(__dirname, "application", "view"));

app.use(express.static(path.join(__dirname, "application")));
    

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
  extended : false,   
  limit : "1mb",      
  parameterLimit : "10000" 
}));


app.get("/", (req, res)=>{
    res.render("index.html")
})
app.use("/evaluation", evaluationRouter);
app.use("/winrate", winrateRouter);
app.use("/adduser", adduserRouter);
app.use("/heroData", heroDataRouter);
app.use("/match", matchRouter);
app.listen(port_num, ()=>{
    console.log(`server is running at port ${port_num}`);
})