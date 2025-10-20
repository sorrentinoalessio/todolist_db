const fs = require('fs');
const express = require('express');

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

app.post('/', add);

app.listen(port, host, () => {
    console.log(`Server avviato ${host}: ${port}.`)
})

