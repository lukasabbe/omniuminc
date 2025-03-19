const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const db = new sqlite3.Database("db.sqlite3");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS items (id TEXT PRIMARY KEY, name TEXT, price INTEGER, quantity INTEGER, stack_size INTEGER)");
});

app.get("/items", (req, res) => {
    db.all("SELECT * FROM items", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post("/item", (req, res) => {
    const { id, name, price, quantity, token, stack_size } = req.body;

    if (!id || !name || !price || !quantity || token !== process.env.TOKEN || !stack_size) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }
    db.run("INSERT INTO items (id, name, price, quantity, stack_size) VALUES (?, ?, ?, ?, ?)", [id, name, price, quantity, stack_size], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Item added successfully" });
    });
});

app.put("/item/:id", (req, res) => {
    const { name, price, quantity, token } = req.body;
    const { id } = req.params;

    if (!name || !price || !quantity || token !== process.env.TOKEN) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }
    db.run("UPDATE items SET name = ?, price = ?, quantity = ?, stack_size = ?, WHERE id = ?", [name, price, quantity, stack_size, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Item updated successfully" });
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});