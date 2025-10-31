import activitySchema from "../schemas/activitySchema.js";// Importa lo schema Mongoose per le attività dal file activitySchema.js
// Definisce la classe ActivityRepository che gestisce le operazioni di accesso ai dati per le attività
class ActivityRepository {
    async add(content) {// Definisce un metodo asincrono chiamato add che accetta un parametro content
        const res = await activitySchema.create(content).catch((err) => {// Crea una nuova attività nel database utilizzando il metodo create dello schema Mongoose
            console.log(err);
        });
        return res.toObject(); // Restituisce l'oggetto attività creato come un oggetto JavaScript semplice
    }
    // Definisce un metodo asincrono chiamato getById che accetta un parametro id
    async getById(id) {
        const res = await activitySchema.findById(id).catch((err) => { // Trova un'attività nel database in base all'ID utilizzando il metodo findById dello schema Mongoose
            console.log(err);
        });
        return res.toObject();
    }
// Definisce un metodo asincrono chiamato update che accetta due parametri: id e params
    async update(id, params) {
        console.log(id, params);
        const res = await activitySchema.findByIdAndUpdate(id, params, {new: true}).catch((err) => { // Aggiorna un'attività nel database in base all'ID utilizzando il metodo findByIdAndUpdate dello schema Mongoose
            console.log(err);
        });
        return res.toObject();
    }
}
// Esporta un'istanza della classe ActivityRepository per essere utilizzata in altre parti dell'applicazione
export default new ActivityRepository(); 