const express = require("express");
const cors = require("cors");
const Keycloak = require('keycloak-connect');
const fs = require('fs');
const path = require('path');
require('./config/cron');

const app = express();
const initDb = require("./config/db");
const session = require('express-session');

const profesorRouter = require('./app/routes/profesor');
const alumnoRouter = require('./app/routes/alumno');
const tpRouter = require('./app/routes/trabajopractico');
const cursoRouter = require('./app/routes/curso');
const grupoRouter = require('./app/routes/grupo');
const calificacionRouter = require('./app/routes/calificacion');
const setupSwaggerDocs = require('./config/swaggerConfig');

const port = "8080";

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

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Permitir cookies y credenciales
}));


app.use(express.json());

// Cambio la proteccion de las rutas con keycloak
app.use(keycloak.protect(), profesorRouter);
app.use(keycloak.protect(), alumnoRouter);
app.use(keycloak.protect(), tpRouter);
app.use(keycloak.protect(), cursoRouter);
app.use(keycloak.protect(), grupoRouter);
app.use(keycloak.protect(), calificacionRouter);

// Swagger
setupSwaggerDocs(app);

// Inicializa la base de datos
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
