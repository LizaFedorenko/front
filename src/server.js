const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Pool } = require("pg");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'  
}));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "solar",
  password: "liza1209",
  port: 5432,
});

app.use(express.json());
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY timestamp ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/moonphase", async (req, res) => {
  try {
    const { startdate } = req.query;
    if (!startdate) {
      return res.status(400).json({ error: "startdate is required" });
    }

    const axios = require("axios");
    const apiUrl = `https://api.viewbits.com/v1/moonphase?startdate=${startdate}`;

    console.log("Fetching:", apiUrl); 

    const response = await axios.get(apiUrl);
    
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching moon phase:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: "Failed to fetch moon phase data" });
  }
});



io.on("connection", (socket) => {
  console.log("Користувач підключився:", socket.id);

  socket.on("sendMessage", async (msg) => {
    const { username, text } = msg;
    if (!username || !text) return;

    try {
      const result = await pool.query(
        "INSERT INTO messages (username, text) VALUES ($1, $2) RETURNING *",
        [username, text]
      );

      io.emit("newMessage", result.rows[0]); 
    } catch (err) {
      console.error("Помилка додавання повідомлення:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Користувач вийшов:", socket.id);
  });
});

server.listen(3001, () => console.log("Сервер працює на порту 3001"));
console.log(app._router.stack);