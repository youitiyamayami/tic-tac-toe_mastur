<template>
  <div class="waiting-room">
    <h2>他のプレイヤーを待っています...</h2>
    <button v-if="readyToStart" @click="moveToWaitingForMatch">対戦を開始する</button>
    <p>接続しているプレイヤー数: {{ connectedPlayers }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connectedPlayers: 0,
      readyToStart: false
    };
  },
  mounted() {
    const uniqueID = localStorage.getItem('uniqueID');
    this.$socket.emit('joinWaitingRoom', uniqueID);

    // サーバーから接続人数を受け取る
    this.$socket.on('updateWaitingRoomCount', (count) => {
      this.connectedPlayers = count;
      this.readyToStart = count === 2;  // 2人揃ったら開始可能
    });
  },
  methods: {
    moveToWaitingForMatch() {
      const uniqueID = localStorage.getItem('uniqueID');
      
      // デバッグ用ログを追加
      console.log('Player is ready to start, ID:', uniqueID);  
      
      this.$socket.emit('moveToWaitingForMatch', uniqueID);
      
      // 対戦待機画面に遷移
      this.$router.push('/waiting-for-match');
    }
  }
}
</script>

<style scoped>
.waiting-room {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
