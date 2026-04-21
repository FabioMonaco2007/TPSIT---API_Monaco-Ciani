//Data/db.js
//Definiamo un array di oggetti che simula il nostro database 
let players = [
  { id: 1, name: "Kenan Yildiz", position: "Attaccante", number: 10 },
  { id: 2, name: "Francisco Conceição", position: "Ala", number: 7 },
  { id: 3, name: "Gleison Bremer", position: "Difensore", number: 3 }
];

//Esportiamo la variabile per poterla richiedere (require) in altri file
//Concetto: Modularità del codice
module.exports = { players };
