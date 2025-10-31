import activityRepo from '../repository/ActivityRepository.js'; //  Importa il modulo activityRepo dal file ActivityRepository.js situato nella cartella repository
// Definisce e esporta una funzione asincrona chiamata addActivity che accetta un parametro content
export const addActivity = async (content) => { 
    return await activityRepo.add(content).catch((err) => { // Chiama il metodo add del modulo activityRepo con il parametro content
        return null;// Se si verifica un errore durante l'aggiunta, restituisce null
    });
}
// Definisce e esporta una funzione asincrona chiamata getActivityById che accetta un parametro id
export const getActivityById = async (id) => {
    return await activityRepo.getById(id).catch((err) => {
        return null;
    });
}
// Definisce e esporta una funzione asincrona chiamata updateActivityById che accetta due parametri: id e params
export const updateActivityById = async (id, params) => {
    return await activityRepo.update(id, params).catch((err) => {
        return null;
    })
}

/* 
export const removeActivityById = async(id) => {
    return await new Promise((resolve, reject) => {
        const readlineInterface = readline.createInterface({
            input: fs.createReadStream(dbFile),
            crlfDelay: Infinity
        });
        const activities = [];
        readlineInterface.on('line', (line) => {
            const activity = JSON.parse(line);
            if(activity.id != id) {
                activities.push(JSON.stringify(activity) + '\n');
            }
        });
        readlineInterface.on('close', () => {
            fs.writeFile(dbFile, activities.join(''), (err) => {
                if (err) {
                    reject(null);
                }
            resolve({id})
            });
        })
    })
}
*/