import express from 'express';
import { activityRoutes } from './routes/routes.js';

const host = 'localhost';
const port = 8001;
const app = express();

app.use(express.json());
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