const express = require('express');
const { activityRoutes } = require('./routes.js');

const host = 'localhost';
const port = 8001;
const app = express();

app.use(express.json());
app.use('/', activityRoutes);
app.use((err, req, res, next) => {
    if (err?.error && err.error.isJoi) {
        if (err.error.details.some(d => d.path.includes('body'))) {
            return res.status(400).json({
                type: err.type,
                message: "Invalid body: " + err.error.toString()
            });
        }
        if (err.error.details.some(d => d.path.includes('params'))) {
            return res.status(400).json({
                type: err.type,
                message: "Invalid params: " + err.error.toString()
            });
        }
    }
    next(err);
});

app.listen(port, host, () => {
    console.log(`Server avviato ${host}: ${port}.`)
})