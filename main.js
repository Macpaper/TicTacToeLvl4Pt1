const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 3000;
const crypto = require('crypto');

app.get('/', (req, res) => {
    let id = crypto.randomUUID();
    res.redirect('/game/' + id);
});

app.use('/game', express.static(__dirname + '/public'));

app.get('/game/:id', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log("a socket has connected")
    socket.on("join room", async roomID => {
        for (let room of socket.rooms) {
            socket.leave(room);
        }
        socket.join(roomID);
        socket.join('hello hi :)');
        const sockets = await io.in(roomID).fetchSockets();

        // 2nd player has joined
        if (sockets.length > 1) {
            socket.to(roomID).emit("start host");
        }
        // 1st player/host has joined
        if (sockets.length == 1) {
            socket.emit("start x");
        }

        // socket.emit("get roomID", roomID);
    });

    socket.on("next turn", (squareNum) => {
        let [id] = socket.rooms;
        socket.to(id).emit("next turn", squareNum);
    });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});