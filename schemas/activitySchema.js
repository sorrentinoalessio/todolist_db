import mongoose from "mongoose"; // Erase if already required
const activitySchemas = new mongoose.Schema( // Definisce lo schema Mongoose per le attività        
    { 
        name: String,
        description: String,
        status: { type: String, default: 'open'}
    },
    { 
        timestamps: true // Aggiunge campi createdAt e updatedAt automaticamente
    }
);
// Exporta il modello Mongoose basato sullo schema definito
export default mongoose.model('activity', activitySchemas); 
