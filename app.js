const express = require("express")
require('dotenv').config();
const app = express()
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine','ejs');

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

app.use('/',require('./routes/index'));

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

