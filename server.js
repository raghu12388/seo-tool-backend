 const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 ADD YOUR API KEY HERE
const API_KEY = "AIzaSyA2EKlNWdd8r3tc0lkJrcjFHCaCsPLBfvo";

// 🧠 Dummy database
let users = [];
let reports = [];

// ✅ HOME
app.get("/", (req, res) => {
  res.send("SEO TOOL API RUNNING 🚀");
});

// ✅ ADMIN PANEL DATA
app.get("/admin", (req, res) => {
  res.json({
    users: users.length,
    reports: reports.length
  });
});

// 🚀 REAL SEO ANALYZER (GOOGLE API)
app.get("/analyze", async (req, res) => {
  const url = req.query.url;

  if (!url) return res.json({ error: "Enter URL" });

  try {
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEY}`;
    const response = await fetch(api);
    const data = await response.json();

    const score =
      data.lighthouseResult.categories.performance.score * 100;

    const speed =
      data.lighthouseResult.audits["speed-index"].displayValue;

    // Save report
    reports.push({ url, score });

    res.json({
      url,
      score: Math.round(score),
      speed,
      suggestions: [
        "Optimize images",
        "Reduce JavaScript",
        "Enable caching",
        "Improve server response time"
      ]
    });

  } catch (err) {
    res.json({ error: "API Failed" });
  }
});

// 🤖 AI SEO SYSTEM
app.post("/ai", (req, res) => {
  const url = req.body.url;

  if (!url) return res.json({ error: "Enter URL" });

  const tips = [
    "Use main keyword in title",
    "Improve website speed",
    "Add meta description",
    "Create quality backlinks",
    "Improve mobile optimization"
  ];

  res.json({
    website: url,
    ai_suggestions: tips
  });
});

// 👤 USER SIGNUP
app.post("/signup", (req, res) => {
  users.push(req.body);
  res.json({ message: "User created" });
});

// 🔐 LOGIN (basic)
app.post("/login", (req, res) => {
  const user = users.find(
    u => u.email === req.body.email && u.password === req.body.password
  );

  if (user) res.json({ success: true });
  else res.json({ success: false });
});

// 🚀 START SERVER
app.listen(3000, () => console.log("🔥 SERVER RUNNING 🚀"));
