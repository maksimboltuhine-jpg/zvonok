const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname));

const peerServer = ExpressPeerServer(server, {
debug: true,
path: '/'
});

app.use('/peerjs', peerServer);

const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
console.log(`Сервер v6.6 запущен на порту ${PORT}`);
});