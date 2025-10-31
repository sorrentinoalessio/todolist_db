import mongoose from "mongoose"; // Importa la libreria Mongoose per interagire con MongoDB

const connectionString = 'mongodb://localhost:27017/todolist'; // Definisce la stringa di connessione al database MongoDB

export const connect = async () => { // Definisce una funzione asincrona per connettersi al database
    try{
        await mongoose.connect(connectionString); // Tenta di connettersi al database utilizzando la stringa di connessione
        console.log('Connected to mongodb');
    } catch(err) {
        console.log('Connection error', err);
    }
}