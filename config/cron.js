const cron = require("node-cron");
const controller = require("../app/controllers/trabajopractico");
// Ejemplo de un cron job que corre cada minuto
<<<<<<< HEAD
cron.schedule('* * * * *', async () => {
=======
cron.schedule('*/1 * * * *', async () => {
>>>>>>> b497123c00e17dcb3099bf0d20de3ececdccc6ab
  console.log(`Cron ejecutado a las: ${new Date().toISOString()}`);
  try {
    // Asegúrate de llamar a la función que no necesita req y res
    await controller.updateEstadoTpsCron();
    console.log("Actualización de estados completada (desde cron).");
  } catch (error) {
    console.error('Error en el cron job:', error);
  }
});
