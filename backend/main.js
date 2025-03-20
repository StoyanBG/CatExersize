const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let cats = []; // In-memory database for cats

// GET route to retrieve all cats
app.get("/cats", (req, res) => {
  res.json(cats);
});

// POST route to create a new cat
app.post("/cats", (req, res) => {
  const { name, age, breed } = req.body;
  if (!name || !age || !breed) {
    return res.status(400).json({ error: "Name, age, and breed are required." });
  }
  const newCat = { id: uuidv4(), name, age, breed };
  cats.push(newCat);
  res.status(201).json(newCat);
});

// PUT route to update an existing cat by ID
app.put("/cats/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, breed } = req.body;
  const cat = cats.find((cat) => cat.id === id);
  if (!cat) {
    return res.status(404).json({ error: "Cat not found." });
  }
  if (name) cat.name = name;
  if (age) cat.age = age;
  if (breed) cat.breed = breed;
  res.json(cat);
});

// DELETE route to remove a cat by ID
app.delete("/cats/:id", (req, res) => {
  const { id } = req.params;
  const catIndex = cats.findIndex((cat) => cat.id === id);
  if (catIndex === -1) {
    return res.status(404).json({ error: "Cat not found." });
  }
  cats.splice(catIndex, 1);
  res.json({ message: "Cat deleted successfully." });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
