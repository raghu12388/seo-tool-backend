const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let users = [];
let reports = [];

app.get("/", (req,res)=>{
  res.send("SEO TOOL API RUNNING 🚀");
});

app.get("/admin", (req,res)=>{
  res.json({
    users: users.length,
    reports: reports.length
  });
});

app.listen(3000, ()=>console.log("Server running 🚀"));
