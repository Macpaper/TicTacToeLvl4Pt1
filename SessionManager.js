class SessionManager {
  constructor() {
    this.sessions = [];
  }
  addSession(id) {
    this.sessions.push(new Session(id));
  }
  getSession(id) {
    let sess = null;
    this.sessions.forEach(s => {
      if (s.getID() == id) {
        sess = s;
      }
    });
    return sess;
  }
}

class Session {
  constructor(id) {
    this.id = id;
    this.playerXID = null;
    this.playerOID = null;
    this.gameStarted = false;
    this.turn = 0;
    this.squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // <-- 1 for X, 2 for O, 0 for empty
    this.messages = [];
  }
  getMessages() {
    return this.messages;
  }
  getSquares() {
    return this.squares;
  }
  setSquare(num, p) {
    this.squares[num] = p;
  }
  getID() {
    return this.id;
  }
  setGameStarted(t) {
    this.gameStarted = t;
  }
  getGameStarted() {
    return this.gameStarted;
  }
  setXID(id) {
    this.playerXID = id;
  }
  setOID(id) {
    this.playerOID = id;
  }
  getXID() {
    return this.playerXID;
  }
  getOID() {
    return this.playerOID;
  }
}
module.exports = SessionManager;