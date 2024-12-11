// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

//En esta sección se selecciona la DB a trabajar.

//--CLOUD--
//Valores tomados del .env
const uri=`mongodb+srv://${encodeURIComponent(process.env.USER_NAME)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${encodeURIComponent(process.env.CLUSTER_NAME)}.mongodb.net/${encodeURIComponent(process.env.DATABASE_NAME)}?retryWrites=true&w=majority`;

//--LOCAL--
//const uri = `mongodb://localhost:27017/"local"`;



const initDb = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // Opcional, para configurar el pool de conexiones
  }).then(() => {
    console.log("Conexión exitosa");
  }).catch(err => {
    console.error("Error conectando:", err.message);
  });
};

module.exports = {
  initDb,
  uri
};

