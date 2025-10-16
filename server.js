const http = require('http');
const host = 'localhost';
const port = 8001;

const requestListener = (req, res) => {

    console.log(req);

    res.writeHead(200);
    res.end('il mio primo server');
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server avviato ${host}: ${port}.`)
})
