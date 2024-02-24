const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const SessionManager = require("./SessionManager.js");
const port = 3000;
const crypto = require('crypto');
app.io = io;

const sessionObj = new SessionManager();

app.get('/', (req, res) => {
  let id = crypto.randomUUID();
  res.redirect('/game/' + id);
});

app.use('/game', express.static(__dirname + '/public'));

app.get('/game/:id', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  socket.on('join room', async(roomID, socketXID, socketOID) => {
    for (let room of socket.rooms) {
      socket.leave(room);
    }
    socket.join(roomID);
    const sockets = await io.in(roomID).fetchSockets();
    let sess = sessionObj.getSession(roomID);
    if (sess == null) {
      sessionObj.addSession(roomID);
      sess = sessionObj.getSession(roomID);
    } else {
      if (socketXID == sess.getXID()) {
        console.log("x has reconnected");
        socket.emit("x rejoins", roomID, sess.getSquares(), sess.turn);
      }
      if (socketOID == sess.getOID()) {
        console.log("o has reconnected");
        socket.emit("o rejoins", roomID, sess.getSquares(), sess.turn);
      }
    }
    
    if (sess != null) {
      // console.log("session exists with id: " + sess.getID());
      if (sess.getGameStarted() == false) {
        // console.log("game has not started on session: " + sess.getID());
        if (sockets.length > 1) {;
          let oID = crypto.randomUUID();
          socket.emit("give o id", oID);
          socket.broadcast.to(roomID).emit("start host");
          sess.setGameStarted(true);
          sess.setOID(oID);
        }
        if (sockets.length == 1) {
          let xID = crypto.randomUUID();
          socket.broadcast.to(roomID).emit("set x", xID);
          sess.setXID(xID);
        }
      }
    }
  });

  socket.on("send message", msg => {
    let [id] = socket.rooms;
    socket.to(id).emit("receive message", msg);
    let sess = sessionObj.getSession(id);
    console.log("got a message: " + msg);
    sess.getMessages().push(msg);
  });

  socket.on('start guest', () => {
    let [id] = socket.rooms;
    socket.to(id).emit("start game", id);
  });

  socket.on("next turn", (squareNum, XorO, turn) => {
    let [id] = socket.rooms;
    socket.to(id).emit("next turn", squareNum);
    let sess = sessionObj.getSession(id);
    sess.setSquare(squareNum, XorO);
    sess.turn = turn;
  });
});

server.listen(port, () => {
  console.log(`listening on *:3000`);
});





// const express = require('express');
// const app = express();
// const crypto = require('crypto');

// const http = require('http');
// const port = 3000;
// const server = http.createServer(app);

// const { Server } = require('socket.io');

// const io = new Server(server);
// app.io = io;

// app.get('/', (req, res) => {
//   let id = crypto.randomUUID();
//   res.redirect('/game/' + id);
// });

// app.use('/game', express.static(__dirname + '/public'));

// app.get('/game/:gameId', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

// io.on('connection', (socket) => {
//   socket.on('join room', async(roomID) => {
    
//   });
// });


// server.listen(port, () => {
//   console.log(`example app listening on port ${port}`);
// });












// app.get('/', (req, res) => {
//   let id = crypto.randomUUID();
//   res.redirect('/game/' + id);
// });

// app.use('/game', express.static(__dirname + '/public'));

// app.get('/game/:gameId', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

// io.on('connection', (socket) => {
//   socket.on('join room', async(roomID) => {
    
//   });
// });

// server.listen(port, () => {
//   console.log(`example app listening on port ${port}`);
// });