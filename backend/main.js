const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database("cats.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS cats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        breed TEXT NOT NULL
      )`
    );
  }
});

// GET: Retrieve all cats
app.get("/cats", (req, res) => {
  db.all("SELECT * FROM cats", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST: Create a new cat
app.post("/cats", (req, res) => {
  const { name, age, breed } = req.body;
  if (!name || !age || !breed) {
    return res.status(400).json({ error: "Name, age, and breed are required." });
  }
  db.run(
    "INSERT INTO cats (name, age, breed) VALUES (?, ?, ?)",
    [name, age, breed],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, age, breed });
    }
  );
});

// PUT: Update a cat
app.put("/cats/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, breed } = req.body;

  db.run(
    "UPDATE cats SET name = ?, age = ?, breed = ? WHERE id = ?",
    [name, age, breed, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Cat not found." });
      }
      res.json({ id, name, age, breed });
    }
  );
});

// DELETE: Remove a cat
app.delete("/cats/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM cats WHERE id = ?", id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Cat not found." });
    }
    res.json({ message: "Cat deleted successfully." });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
