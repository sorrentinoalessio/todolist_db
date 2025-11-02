import express from 'express';
import { activityRoutes } from './routes/routes.js';
import { connect } from './database.js';

const host = 'localhost';
const port = 8001;
const app = express();

app.use(express.json());
connect().then(() => {
    app.use('/', activityRoutes);
    app.use((err, req, res, next) => {
        if(err?.error && err.error.isJoi) {
            res.status(400).json({type: err.type, message: err.error.toString()});
        }
        else{
            next(err);
        }
    })
    app.listen(port, host, () => {
        console.log(`Server avviato ${host}: ${port}.`)
    })
})

//
// POST JSON → Route → Validator Joi → Service → Repository → activitySchema (Mongoose) → MongoDB → Service → Route → JSON al client
// CRUD: Create, Read, Update, Delete