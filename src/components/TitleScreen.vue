<template>
  <div class="title-screen">
    <h1>三目並べ</h1>
    <button @click="startSinglePlayerGame">ゲームを始める</button>
    <button @click="startMultiplayerMatch">対戦をする</button>
  </div>
</template>

<script>
export default {
  name: "TitleScreen",
  methods: {
    startSinglePlayerGame() {
      this.$router.push('/single');  // シングルプレイヤーモードに遷移
    },
    startMultiplayerMatch() {
      this.$router.push('/waiting');  // 対戦前の待機画面に遷移
    }
  }
}
</script>

<style scoped>
.title-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  margin: 10px 0;
}
</style>
