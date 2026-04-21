//server.js
const express = require("express");
const app = express();
const playersRoutes = require("./Routes/players");

//MIDDLEWARE per il parsing del JSON
//Fondamentale: permette ad Express di leggere i dati inviati nel corpo della richiesta (req.body)
app.use(express.json());

//ROUTING: Colleghiamo le rotte dei giocatori al prefisso "/api/players"
//Questo rende il codice organizzato: tutte le rotte in players.js inizieranno con questo percorso
app.use("/api/players", playersRoutes);

//Avvio del server su una porta specifica
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Fino alla fine! Server attivo su http://localhost:${PORT}`);
});
