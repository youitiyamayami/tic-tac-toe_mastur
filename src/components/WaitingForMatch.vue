<template>
  <div class="waiting-for-match">
    <h2>対戦相手を待っています...</h2>
    <p v-if="matchStarted">対戦が始まります！</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      matchStarted: false
    };
  },
  mounted() {
    // サーバーから対戦開始の通知を受信
    this.$socket.on('startMatch', (players) => {
      console.log('対戦開始プレイヤー情報:', players);
      this.matchStarted = true;
      this.$router.push('/multiplayer');  // 対戦画面に遷移
    });
  }
}
</script>

<style scoped>
.waiting-for-match {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

p {
  margin-top: 20px;
  font-size: 18px;
  color: green;
}
</style>
