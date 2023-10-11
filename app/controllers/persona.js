const model = require("../models/persona");

exports.getData = async (req, res) => {
  try {
    const arrayPersonas = await model.find();
    console.log(arrayPersonas);
    res.send({ arrayPersonas });
  } catch (error) {
    console.log(`Ocurrio un error: ${error}`);
  }
};

exports.insertData = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const response = await model.create(data);
    res.status(201).json(response);
  } catch (error) {
    console.log(
      "Ocurrio un error al insertar un elemento en la tabla Persona: ",
      error
    );
    res.send({ error: "Error" }, 422);
  }
};
