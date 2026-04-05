const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname));

const peerServer = ExpressPeerServer(server, {
debug: true,
path: '/',
allow_discovery: true
});

app.use('/peerjs', peerServer);

// Лог для отладки в PowerShell
peerServer.on('connection', (client) => { console.log(`Юзер зашел: ${client.getId()}`); });
peerServer.on('disconnect', (client) => { console.log(`Юзер вышел: ${client.getId()}`); });

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
console.log(`=== SERVER v26 ONLINE ON PORT ${PORT} ===`);
});