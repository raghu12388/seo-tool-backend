 const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 PUT YOUR API KEY HERE
const API_KEY = "AIzaSyA2EKlNWdd8r3tc0lkJrcjFHCaCsPLBfvo";

let users = [];
let reports = [];

// HOME
app.get("/", (req,res)=>{
  res.send("SEO TOOL API RUNNING 🚀");
});

// ADMIN
app.get("/admin", (req,res)=>{
  res.json({
    users: users.length,
    reports: reports.length
  });
});

// 🔥 SEO ANALYZER (THIS WAS MISSING)
app.get("/analyze", async (req,res)=>{
  const url = req.query.url;

  if(!url) return res.json({error:"Enter URL"});

  try{
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEY}`;

    const response = await fetch(api);
    const data = await response.json();

    const score = data.lighthouseResult.categories.performance.score * 100;

    const speed = data.lighthouseResult.audits["speed-index"].displayValue;

    reports.push({url, score});

    res.json({
      url,
      score: Math.round(score),
      speed,
      suggestions:[
        "Optimize images",
        "Reduce JS",
        "Use caching",
        "Improve server speed"
      ]
    });

  }catch(err){
    res.json({error:"API Failed"});
  }
});

// 🤖 AI
app.post("/ai",(req,res)=>{
  const url = req.body.url;

  res.json({
    website:url,
    ai_suggestions:[
      "Improve speed",
      "Add keywords",
      "Build backlinks"
    ]
  });
});

app.listen(3000, ()=>console.log("Server running 🚀"));
