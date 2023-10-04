const express = require("express");
const app = express();

const mongoose = require("mongoose");

const usuario = "testing";
const password = "g91sIlewwwmkvh9p";

const uri = `mongodb+srv://${usuario}:${password}@cuadernodelab.xhkt48e.mongodb.net/`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Se ha conectado a mongodb correctamente"))
  .catch((e) => console.log("error de conexión", e.message));


const http = require("http");

const port = "3000";


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Usa el enrutador de Persona.js para manejar las rutas definidas en ese archivo
app.use("/",  require("./router/index"));




