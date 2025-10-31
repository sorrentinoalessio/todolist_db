import express from 'express'; //Importa la libreria Express.js, che è il framework per creare il server.
import { activityRoutes } from './routes/routes.js'; // Importa un oggetto router chiamato activityRoutes
import { connect } from './database.js'; //Importa una funzione chiamata connect dal file locale

const host = 'localhost'; // Definisce l'host su cui il server ascolterà le richieste.
const port = 8001; // Definisce la porta su cui il server ascolterà le richieste.
const app = express(); // Crea un'istanza dell'applicazione Express.
app.use(express.json()); // Questo middleware specifico analizza il corpo delle richieste in formato JSON e lo rende disponibile sotto req.body.
connect().then(() => { // Chiama la funzione connect per stabilire una connessione al database. La funzione restituisce una promessa.
     // Quando la connessione al database è stabilita con successo, viene eseguita la funzione all'interno di then().
     // All'interno di questa funzione, viene aggiunto un altro middleware all'applicazione Express.    
    app.use('/', activityRoutes); // Questo middleware specifica che tutte le richieste che iniziano con '/' (la radice del server) saranno gestite dall'oggetto activityRoutes importato in precedenza.
     // Aggiunge un middleware di gestione degli errori all'applicazione Express.
     // Questo middleware intercetta gli errori che si verificano durante l'elaborazione delle richieste.
     // Se l'errore è un errore di validazione Joi, invia una risposta con stato 400 e un messaggio di errore.
     // Altrimenti, passa l'errore al prossimo middleware di gestione degli errori.
    app.use((err, req, res, next) => { // Middleware di gestione degli errori
        if(err?.error && err.error.isJoi) { // Controlla se l'errore è un errore di validazione Joi
             // Invia una risposta con stato 400 (Bad Request) e un oggetto JSON contenente il tipo e il messaggio di errore
            res.status(400).json({type: err.type, message: err.error.toString()});// Risposta di errore per validazione fallita
        }
        else{
            next(err);// Passa l'errore al prossimo middleware di gestione degli errori
        }
    })
    app.listen(port, host, () => { // Avvia il server Express, facendolo ascoltare sulle specifiche host e port.
         // Quando il server è avviato con successo, viene eseguita la funzione di callback che stampa un messaggio di conferma sulla console.
        console.log(`Server avviato ${host}: ${port}.`) //  Messaggio di conferma dell'avvio del server
    })
})
