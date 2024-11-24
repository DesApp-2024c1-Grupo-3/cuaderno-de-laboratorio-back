// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

//En esta linea se selecciona la DB a trabajar.

//Cloud
const uri = `mongodb+srv://cesaraugustopacheco:${encodeURIComponent(process.env.DB_PASSWORD)}@clusterunahur.lqu9g.mongodb.net/Proyect?retryWrites=true&w=majority`;

//Local
//const uri = `mongodb://localhost:27017/"local"`;



const initDb = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // Opcional, para configurar el pool de conexiones
  }).then(() => {
    console.log("Conexión exitosa a MongoDB Atlas con Mongoose");
  }).catch(err => {
    console.error("Error conectando a MongoDB Atlas:", err.message);
  });
};

module.exports = initDb;
