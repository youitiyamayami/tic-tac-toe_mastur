const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://192.168.1.11:8080',
  methods: ['GET', 'POST'],
  credentials: true
}));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://192.168.1.11:8080',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

let waitingRoomPlayers = {};
let waitingForMatchPlayers = {};
let gameState = Array(9).fill(null);  // ゲームの状態を管理する配列

io.on('connection', (socket) => {
  console.log('New player connected:', socket.id);

  socket.on('joinWaitingRoom', (uniqueID) => {
    if (!waitingRoomPlayers[uniqueID]) {
      waitingRoomPlayers[uniqueID] = socket.id;
      console.log('プレイヤーが待機室に入りました:', uniqueID);
    }

    const numPlayers = Object.keys(waitingRoomPlayers).length;
    console.log('現在の待機室のプレイヤー数:', numPlayers);
    io.emit('updateWaitingRoomCount', numPlayers);
  });

  socket.on('moveToWaitingForMatch', (uniqueID) => {
    if (waitingRoomPlayers[uniqueID]) {
      waitingForMatchPlayers[uniqueID] = waitingRoomPlayers[uniqueID];
      delete waitingRoomPlayers[uniqueID];
      console.log(`${uniqueID} が対戦待機画面に移動しました`);
    }

    const matchPlayers = Object.keys(waitingForMatchPlayers).length;
    console.log('現在の対戦待機画面のプレイヤー数:', matchPlayers);

    if (matchPlayers === 2) {
      console.log('対戦を開始します！');
      io.emit('startMatch');
    }
  });

  // プレイヤーがクリックしたときの処理
  socket.on('makeMove', ({ index, symbol }) => {
    if (!gameState[index]) {
      gameState[index] = symbol;
      io.emit('moveMade', { index, symbol });  // 全員にこの移動を通知
    }
  });

  socket.on('disconnect', () => {
    let disconnectedUUID = null;

    for (const [uniqueID, socketId] of Object.entries(waitingRoomPlayers)) {
      if (socketId === socket.id) {
        disconnectedUUID = uniqueID;
        delete waitingRoomPlayers[uniqueID];
        console.log('プレイヤーが待機室から切断されました:', uniqueID);
        break;
      }
    }

    for (const [uniqueID, socketId] of Object.entries(waitingForMatchPlayers)) {
      if (socketId === socket.id) {
        disconnectedUUID = uniqueID;
        delete waitingForMatchPlayers[uniqueID];
        console.log('プレイヤーが対戦待機画面から切断されました:', uniqueID);
        break;
      }
    }

    const numWaitingRoomPlayers = Object.keys(waitingRoomPlayers).length;
    const numWaitingForMatchPlayers = Object.keys(waitingForMatchPlayers).length;
    console.log('切断後の待機室プレイヤー数:', numWaitingRoomPlayers);
    console.log('切断後の対戦待機画面プレイヤー数:', numWaitingForMatchPlayers);
    
    io.emit('updateWaitingRoomCount', numWaitingRoomPlayers);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
