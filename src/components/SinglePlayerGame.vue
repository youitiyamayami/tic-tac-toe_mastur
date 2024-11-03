<template>
  <div>
    <h2>シングルプレイヤーモード</h2>
    <TicTacToeBoard @game-over="handleGameOver" />
  </div>
</template>

<script>
import TicTacToeBoard from './Board.vue';

export default {
  name: "SinglePlayerGame",
  components: {
    TicTacToeBoard
  },
  methods: {
    handleGameOver() {
      // ゲーム終了時にタイトル画面にリダイレクト
      this.$router.push('/');
    }
  }
}
</script>

<style>
/* 必要に応じてスタイルを追加 */
</style>
