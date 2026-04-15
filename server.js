const express = require("express");
const app = express();
const playersRoutes = require("./Routes/players");

app.use(express.json());

// Rotta per la rosa della Juventus
app.use("/api/players", playersRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Fino alla fine! Server attivo su http://localhost:${PORT}`);
});