const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Раздаем статику (наш html)
app.use(express.static(__dirname));

// Настройка Peer сервера
const peerServer = ExpressPeerServer(server, {
debug: true,
path: '/'
});

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'index.html'));
});

// Порт 10000 идеален для Render
const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
console.log(`=== SERVER RUNNING ON PORT ${PORT} ===`);
});