const express = require("express");
const cors = require("cors");
const Keycloak = require('keycloak-connect');
const fs = require('fs');
const path = require('path');
require('./config/cron');

const app = express();
const { initDb } = require('./config/db');
const session = require('express-session');
const moment = require("moment-timezone");

// Configurar la zona horaria global
moment.tz.setDefault("America/Argentina/Buenos_Aires");

const profesorRouter = require('./app/routes/profesor');
const alumnoRouter = require('./app/routes/alumno');
const tpRouter = require('./app/routes/trabajopractico');
const cursoRouter = require('./app/routes/curso');
const grupoRouter = require('./app/routes/grupo');
const calificacionRouter = require('./app/routes/calificacion');
const materiaRouter = require('./app/routes/materia');

const setupSwaggerDocs = require('./config/swaggerConfig');
const { db } = require("./app/models/trabajopractico");

const port = "8080";

//npm install keycloak-connect express-session swagger-jsdoc swagger-ui-express


// Configuración de sesión
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'some-secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Configuración de Keycloak
const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware());


const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', //Por esta hijadeputez estuve una semana y media!!!
  credentials: true, // Permite enviar cookies
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(profesorRouter);
app.use(alumnoRouter);
app.use(tpRouter);
app.use(cursoRouter);
app.use(grupoRouter);
app.use(calificacionRouter);
app.use(materiaRouter);

app.get('/favicon.ico', (req, res) => res.status(204)); // Respuesta vacía para el favicon


// Swagger
setupSwaggerDocs(app);
// Para ingresar a swagger -> http://localhost:8080/api-docs/


initDb();

// Crea la carpeta 'uploads' si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log(`La carpeta ${uploadsDir} ha sido creada.`);
}

// Inicia el servidor
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
