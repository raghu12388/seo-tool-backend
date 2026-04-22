 const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyA2EKlNWdd8r3tc0lkJrcjFHCaCsPLBfvo";

let users = [];
let reports = [];

// HOME
app.get("/", (req,res)=>{
  res.send("SEO TOOL API RUNNING 🚀");
});

// SIGNUP
app.post("/signup",(req,res)=>{
  users.push(req.body);
  res.json({msg:"User created"});
});

// LOGIN
app.post("/login",(req,res)=>{
  let user = users.find(
    u => u.email === req.body.email && u.password === req.body.password
  );

  if(user) res.json({success:true});
  else res.json({success:false});
});

// ANALYZE + SAVE REPORT
app.get("/analyze", async (req,res)=>{
  const url = req.query.url;
  const email = req.query.email;

  try{
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEY}`;
    const r = await fetch(api);
    const data = await r.json();

    let score = data.lighthouseResult.categories.performance.score * 100;
    let speed = data.lighthouseResult.audits["speed-index"].displayValue;

    let report = {
      email,
      url,
      score: Math.round(score),
      speed,
      date: new Date()
    };

    reports.push(report);

    res.json(report);

  }catch{
    res.json({error:"fail"});
  }
});

// GET USER REPORTS
app.get("/reports",(req,res)=>{
  let email = req.query.email;

  let userReports = reports.filter(r => r.email === email);

  res.json(userReports);
});

app.listen(3000, ()=>console.log("🔥 SERVER RUNNING"));
