const Router = require("express");
//import { renderIndex, renderAbout } from "../controllers/index.controller.js";
const router = Router();

const { getPersonas } = require("./Persona");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/personas", async (req, res) => {
  try {
    // Llama a la función getPersonas y espera su resultado
    const arrayPersonas = await getPersonas();

    res.json({ personas: arrayPersonas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: ", res.message);
  }
});

module.exports = router;
