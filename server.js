 const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyA2EKlNWdd8r3tc0lkJrcjFHCaCsPLBfvo";

// TEMP STORAGE (no DB yet)
let users = [];
let reports = [];

// HOME
app.get("/", (req,res)=>{
  res.send("🚀 SEO TOOL API RUNNING");
});

// SIGNUP
app.post("/signup",(req,res)=>{
  const {email,password} = req.body;

  let exists = users.find(u=>u.email===email);
  if(exists) return res.json({error:"User exists"});

  users.push({email,password});
  res.json({success:true});
});

// LOGIN
app.post("/login",(req,res)=>{
  const {email,password} = req.body;

  let user = users.find(
    u=>u.email===email && u.password===password
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

    let score = Math.round(
      data.lighthouseResult.categories.performance.score * 100
    );

    let speed = data.lighthouseResult.audits["speed-index"].displayValue;

    let report = {email,url,score,speed,date:new Date()};

    reports.push(report);

    res.json({
      score,
      speed,
      suggestions:[
        "Optimize images",
        "Reduce JS",
        "Enable caching",
        "Improve server speed"
      ]
    });

  }catch{
    res.json({error:"API failed"});
  }
});

// GET REPORTS
app.get("/reports",(req,res)=>{
  let email = req.query.email;

  let userReports = reports.filter(r=>r.email===email);

  res.json(userReports);
});

app.listen(3000, ()=>console.log("🔥 SERVER RUNNING"));
