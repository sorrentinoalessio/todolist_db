import activityRepo from '../repository/ActivityRepository.js';

export const addActivity = async (content) => {
    return await activityRepo.add(content).catch((err) => {
        return null;
    });
}

export const getActivityById = async (id) => {
    return await activityRepo.getById(id).catch((err) => {
        return null;
    });
}

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