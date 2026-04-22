 const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = []; // store users

// 🔐 SIGNUP
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  let exist = users.find(u => u.email === email);
  if (exist) return res.json({ error: "User already exists" });

  users.push({ email, password });
  res.json({ message: "Signup successful" });
});

// 🔐 LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.json({ error: "Invalid login" });

  res.json({ message: "Login success", user });
});

// TEST
app.get("/", (req,res)=>{
  res.send("API Running 🚀");
});

app.listen(3000, () => console.log("Server running 🚀"));
