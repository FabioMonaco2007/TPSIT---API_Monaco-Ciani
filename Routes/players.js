const express = require("express");
const router = express.Router(); 
let { players } = require("../Data/db");

// --- READ (Tutti) ---
//Metodo GET: Recupera l'intera collezione
router.get("/", (req, res) => {
  //Restituiamo l'array in formato JSON con status code 200 (implicito)
  res.json(players);
});

// --- READ (Singolo) ---
//Metodo GET con parametro dinamico (:id)
router.get("/:id", (req, res) => {
  //Parsing del parametro: i parametri nella URL sono sempre stringhe, li trasformiamo in numeri
  const id = parseInt(req.params.id);
  //Cerchiamo il giocatore nell'array tramite il metodo .find()
  const player = players.find(p => p.id === id);

  //Gestione errore: Se il giocatore non esiste, restituiamo il codice 404 (Not Found)
  if (!player) return res.status(404).json({ message: "Giocatore non trovato" });
  res.json(player);
});

// --- CREATE ---
//Metodo POST: Riceve dati dal corpo della richiesta (req.body)
router.post("/", (req, res) => {
  const newPlayer = {
    //Logica per l'auto-incremento dell'ID: prendiamo l'ultimo ID e aggiungiamo 1
    id: players.length > 0 ? players[players.length - 1].id + 1 : 1,
    name: req.body.name,
    position: req.body.position,
    number: req.body.number
  };
  players.push(newPlayer);
  //Status 201: Indica che una risorsa è stata "Creata" con successo
  res.status(201).json(newPlayer);
});

// --- UPDATE ---
//Metodo PUT: Aggiorna una risorsa esistente
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = players.findIndex(p => p.id === id);

  if (index !== -1) {
    //Spread Operator (...): Uniamo i dati vecchi con quelli nuovi inviati nel body
    players[index] = { ...players[index], ...req.body, id };
    res.json(players[index]);
  } else {
    res.status(404).json({ message: "Giocatore non trovato" });
  }
});

// --- DELETE ---
//Metodo DELETE: Rimuove una risorsa
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = players.findIndex(p => p.id === id);

  if (index !== -1) {
    //Rimuoviamo l'elemento dall'array usando splice
    const deleted = players.splice(index, 1);
    res.json({ message: "Giocatore ceduto", player: deleted[0] });
  } else {
    res.status(404).json({ message: "Giocatore non trovato" });
  }
});

module.exports = router;
