const cron = require("node-cron");
const controller = require("../app/controllers/trabajopractico");

// Ejemplo de un cron job que corre cada hora
cron.schedule('* * * * *', async () => {
    

    // Agregamos console.log para verificar la fecha que está tomando el cron
    console.log(`Cron ejecutado a las: ${now.toISOString()}`); // Imprimir la fecha actual en formato ISO


    try {

      controller.updateEstadoTps();
      console.log("a ver sianda");

      /*// Cambiar estado de trabajos en marcha (excepto los cerrados)
      await TrabajoPractico.updateMany(
        { fechaInicio: { $lte: now }, fechaFin: { $gte: now }, estado: { $nin: ["En marcha", "Cerrado"] } },
        { estado: 'En marcha' }
      );
  
      // Cambiar estado de trabajos en evaluación (excepto los cerrados)
      await TrabajoPractico.updateMany(
        { fechaFin: { $lt: now }, estado: { $nin: ["En evaluacion", "Cerrado"] } },
        { estado: 'En evaluacion' }
      );
  
      // Cambiar estado de trabajos futuros (excepto los cerrados)
      await TrabajoPractico.updateMany(
        { fechaInicio: { $gt: now }, estado: { $nin: ["Futuro", "Cerrado"] } },
        { estado: 'Futuro' }
      );
  
      console.log('Estados de trabajos prácticos actualizados (excepto los cerrados).');*/
    } catch (error) {
      console.error('Error actualizando los estados:', error);
    }
});
