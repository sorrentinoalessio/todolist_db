import { getActivityById } from '../services/activityService.js'; // Importa la funzione getActivityById dal file activityService.js

export const get = async (req, res) => { // Definisce un controller asincrono chiamato get
    const activityId = req.params.id; // Estrae l'ID dell'attività dai parametri della richiesta
    const activity = await getActivityById(activityId); // Chiama la funzione getActivityById per ottenere i dettagli dell'attività corrispondente all'ID fornito
     // Se l'attività viene trovata, invia una risposta con stato 200 e i dettagli dell'attività in formato JSON
     // Altrimenti, invia una risposta con stato 404 e un messaggio di errore
    if(activity) {
        res.status(200).json(activity);
    } 
    else {
        res.status(404).json({message: `error: activity ${activityId} not found`});
    }
}