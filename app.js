const express = require("express");
const app = express();
const initDb = require("./config/db");
const profesorRouter = require('./app/routes/profesor');
const alumnoRouter = require('./app/routes/alumno');
const tpRouter = require('./app/routes/trabajopractico');
const cursoRouter = require('./app/routes/curso');
const grupoRouter = require('./app/routes/grupo');
const materiaRouter = require('./app/routes/materia');

const port = "8080";

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use(express.json());


app.use(profesorRouter);
app.use(alumnoRouter);
app.use(tpRouter);
app.use(cursoRouter);
app.use(grupoRouter);
app.use(materiaRouter);

initDb();
