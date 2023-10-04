const express = require('express');
const router = express.Router();

const Persona = require('../models/persona')

const getPersonas = async (req, res) => {
  try {
      const arrayPersonas = await Persona.find();
      console.log(arrayPersonas);

      // Envía la lista de personas en formato de texto plano
      return arrayPersonas
  } catch (error) {
      console.log(error);
    }
};


module.exports = {getPersonas}
