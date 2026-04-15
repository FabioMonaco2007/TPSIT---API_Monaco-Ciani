const express = require("express");
const router = express.Router();
let { players } = require("../Data/db");

// GET - Recupera tutta la rosa
router.get("/", (req, res) => {
  res.json(players);
});

// GET - Recupera un giocatore per ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const player = players.find(p => p.id === id);
  if (!player) return res.status(404).json({ message: "Giocatore non trovato" });
  res.json(player);
});

// POST - Aggiungi un nuovo acquisto
router.post("/", (req, res) => {
  const newPlayer = {
    id: players.length > 0 ? players[players.length - 1].id + 1 : 1,
    name: req.body.name,
    position: req.body.position,
    number: req.body.number
  };
  players.push(newPlayer);
  res.status(201).json(newPlayer);
});

// PUT - Modifica dati di un giocatore (es. cambio numero maglia)
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = players.findIndex(p => p.id === id);

  if (index !== -1) {
    players[index] = { ...players[index], ...req.body, id };
    res.json(players[index]);
  } else {
    res.status(404).json({ message: "Giocatore non trovato" });
  }
});

// DELETE - Cessione giocatore
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = players.findIndex(p => p.id === id);

  if (index !== -1) {
    const deleted = players.splice(index, 1);
    res.json({ message: "Giocatore ceduto", player: deleted[0] });
  } else {
    res.status(404).json({ message: "Giocatore non trovato" });
  }
});

module.exports = router;