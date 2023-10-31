const express = require("express");
const app = express();
const initDb = require("./config/db");
const profesorRouter = require('./app/routes/profesor');
const alumnoRouter = require('./app/routes/alumno');
const tpRouter = require('./app/routes/trabajopractico');
const cursoRouter = require('./app/routes/curso');

const port = "3000";

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use(express.json());

// Usa el enrutador de Persona.js para manejar las rutas definidas en ese archivo
app.use(profesorRouter);
app.use(alumnoRouter);
app.use(tpRouter);
app.use(cursoRouter);

initDb();
