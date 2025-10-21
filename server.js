const fs = require('fs');
const express = require('express');
const readline = require('node:readline');

const host = 'localhost';
const port = 8001;
const app = express();
const dbFile = 'activity.db';

app.use(express.json());

const newId = () => {
    if(!fs.existsSync(dbFile)) {
        fs.openSync(dbFile, 'w');
    }
    const file = fs.readFileSync(dbFile);
    return file.toString().split('\n').length;
}

const add = (req, res) => {
    const content = req.body;
    content.id = newId();
    content.status = 'open';
    content.createAt = new Date();
    content.updateAt = content.createAt;

    fs.appendFile(dbFile, JSON.stringify(content) + '\n', (err) => {
        if(err) {
            res.status(500).json({message: `error: ${err}`});
        } else {
            res.status(201).json(content);
        }
    });
}

const getActivityById = async (id) => {
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
const get = async (req, res) => {
    const activityId = parseInt(req.params.id);
    const activity = await getActivityById(activityId);
    if(activity) {
        res.status(200).json(activity);
    } 
    else {
        res.status(404).json({message: `error: activity ${activityId} not found`});
    }
}


const updateActivityById = async (id, params) => {
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
            let updatedActivity;
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

const update = async (req, res) => {
    const activityId = parseInt(req.params.id);
    const activity = await updateActivityById(activityId, req.body);
    if(activity) {
        res.status(200).json(activity);
    } 
    else {
        res.status(404).json({message: `error: activity ${activityId} not found`});
    }
}

app.post('/', add);
app.get('/:id', get);
app.patch('/:id', update);

app.listen(port, host, () => {
    console.log(`Server avviato ${host}: ${port}.`)
})

