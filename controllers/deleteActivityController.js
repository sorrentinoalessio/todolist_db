import { updateActivityById } from '../services/activityService.js';
// Importa la funzione updateActivityById dal file activityService.js
export const remove = async (req, res) => { // Definisce un controller asincrono chiamato remove
    const activityId = req.params.id; // Estrae l'ID dell'attività dai parametri della richiesta
     // Chiama la funzione updateActivityById per aggiornare lo stato dell'attività a 'deleted'
    const result = await updateActivityById(activityId, {status: 'deleted'});
    return !result ? res.status(500).json({message: `Error deleting ${activityId}`}) : res.status(200).json(result);
}// Invia una risposta con stato 500 in caso di errore o con stato 200 e i dettagli dell'attività aggiornata in formato JSON in caso di successo