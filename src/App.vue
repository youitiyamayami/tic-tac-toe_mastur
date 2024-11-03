<template>
  <router-view />
</template>

<script>
import { io } from 'socket.io-client';

export default {
  name: 'App',
  created() {
    // Socket.IOの接続をアプリ全体で一度だけ確立
    const socket = io('http://192.168.1.11:3000');
    this.$socket = socket;
    
    // グローバルにSocket.IO接続を利用できるようにする
    this.$root.$socket = socket;
  },
  beforeUnmount() {  // Vue 3ではbeforeUnmountを使用します
    // コンポーネントが破棄されるときにSocket.IO接続をクリーンアップ
    this.$socket.disconnect();
  }
};
</script>
