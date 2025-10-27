import fs from 'fs';
import readline from 'node:readline';

const dbFile = 'activity.db';

const newId = () => {
    if(!fs.existsSync(dbFile)) {
        fs.openSync(dbFile, 'w');
    }
    const file = fs.readFileSync(dbFile);
    return file.toString().split('\n').length;
}

export const addActivity = (content) => {
    content.id = newId();
    content.status = 'open';
    content.createAt = new Date();
    content.updateAt = content.createAt;

    fs.appendFile(dbFile, JSON.stringify(content) + '\n', (err) => {
        if(err) {
            throw new Error(`error: ${err}`)
        }
        return content;
    });
}

export const getActivityById = async (id) => {
    if(!fs.existsSync(dbFile)) {
        return null;
    }
    try {
        return await new Promise((resolve, reject) => {
            const readlineInterface = readline.createInterface({
                input: fs.createReadStream(dbFile),
                crlfDelay: Infinity
            });
            readlineInterface.on('line', (line) => {
                const activity = JSON.parse(line);
                if(activity.id === id) {
                    resolve (activity);
                }
            });
            readlineInterface.on('close', (close) => {
                reject(null);
            })
        })
    } catch(err) {
        return null;
    }
}

export const updateActivityById = async (id, params) => {
    if(!fs.existsSync(dbFile)) {
        return null;
    }
    try {
        return await new Promise((resolve, reject) => {
            const readlineInterface = readline.createInterface({
                input: fs.createReadStream(dbFile),
                crlfDelay: Infinity
            });
            const activities = [];
            let updatedActivity = {};
            readlineInterface.on('line', (line) => {
                const activity = JSON.parse(line);
                if(activity.id === id) {
                    Object.keys(params).forEach((key) => {
                        activity[key] = params[key];
                    })
                    updatedActivity = {...activity};
                }
                activities.push(JSON.stringify(activity) + '\n');
            });
            readlineInterface.on('close', (close) => {
                fs.writeFile(dbFile, activities.join(''), (err) => {
                    if(err) {
                        reject(null);
                    }
                    resolve(updatedActivity);
                });
            })
        })
    } catch(err) {
        return null;
    }
}

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