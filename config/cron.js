const cron = require("node-cron");
const moment = require("moment-timezone")
const controller = require("../app/controllers/trabajopractico");
// Ejemplo de un cron job que corre cada minuto

cron.schedule('* * * * *', async () => {
  const localTime = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm');
  console.log(`Cron ejecutado a las: ${localTime} hora local.`);
  try {
    // Asegúrate de llamar a la función que no necesita req y res
    await controller.updateEstadoTpsCron();
    console.log("Actualización de estados completada (desde cron).");
  } catch (error) {
    console.error('Error en el cron job:', error);
  }
});
