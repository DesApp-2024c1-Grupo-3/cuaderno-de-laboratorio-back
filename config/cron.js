const cron = require("node-cron");
const controller = require("../app/controllers/trabajopractico");
// Ejemplo de un cron job que corre cada minuto
cron.schedule('*/1 * * * *', async () => {
  console.log(`Cron ejecutado a las: ${new Date().toISOString()}`);
  try {
    // Asegúrate de llamar a la función que no necesita req y res
    await controller.updateEstadoTpsCron();
    console.log("Actualización de estados completada (desde cron).");
  } catch (error) {
    console.error('Error en el cron job:', error);
  }
});
