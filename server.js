 const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let reports = [];

// SIGNUP
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.json({ error: "User exists" });
  }

  users.push({ email, password });
  res.json({ message: "Signup success" });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.json({ error: "Invalid login" });

  res.json({ user });
});

// SAVE REPORT
app.post("/save-report", (req, res) => {
  const { email, url, score, speed } = req.body;

  reports.push({
    email,
    url,
    score,
    speed,
    date: new Date()
  });

  res.json({ message: "Saved" });
});

// GET REPORTS
app.get("/reports/:email", (req, res) => {
  let userReports = reports.filter(r => r.email === req.params.email);
  res.json(userReports);
});

app.get("/", (req,res)=>{
  res.send("SEO API Running 🚀");
});

app.listen(3000, () => console.log("Server running 🚀"));
