import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';  // UUIDを生成するためのパッケージ

// ローカルストレージからUUIDを取得（なければ新規生成）
let uniqueID = localStorage.getItem('uniqueID');
if (!uniqueID) {
  uniqueID = uuidv4();  // UUIDを新規生成
  localStorage.setItem('uniqueID', uniqueID);  // ローカルストレージに保存
}

const socket = io('http://192.168.1.11:3000');

// サーバーにUUIDを送信してデバイスを登録
socket.emit('register', uniqueID);

const app = createApp(App);
app.config.globalProperties.$socket = socket;
app.use(router);
app.mount('#app');
