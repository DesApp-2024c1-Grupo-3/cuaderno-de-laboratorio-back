const express = require("express");
const cors = require("cors"); // Importa el paquete CORS
const fs = require('fs');
const path = require('path');
require('./config/cron.js');  

const app = express();
const initDb = require("./config/db");
const profesorRouter = require('./app/routes/profesor');
const alumnoRouter = require('./app/routes/alumno');
const tpRouter = require('./app/routes/trabajopractico');
const cursoRouter = require('./app/routes/curso');
const grupoRouter = require('./app/routes/grupo');
const calificacionRouter  = require('./app/routes/calificacion');

const port = "8080";

app.use(cors()); 

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log(`La carpeta ${uploadsDir} ha sido creada.`);
}

app.use(express.json());


app.use(profesorRouter);
app.use(alumnoRouter);
app.use(tpRouter);
app.use(cursoRouter); 
app.use(grupoRouter);
app.use(calificacionRouter);

initDb();
