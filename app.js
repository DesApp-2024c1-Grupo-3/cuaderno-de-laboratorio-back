const express = require("express");
const app = express();
const initDb = require("./config/db");
const personaRouter = require('./app/routes/persona');

const port = "3000";

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use(express.json());

// Usa el enrutador de Persona.js para manejar las rutas definidas en ese archivo
app.use(personaRouter);

initDb();
