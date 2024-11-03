<template>
  <div>
    <h2>対戦モード</h2>
    <!-- Board.vueを利用し、適切に対戦を管理 -->
    <TicTacToeBoard :disabled="!isMyTurn" @make-move="sendMove" @game-over="handleGameOver" />
    <p v-if="!isMyTurn">相手の手を待っています...</p>
  </div>
</template>

<script>
import TicTacToeBoard from './Board.vue';  // Board.vueをインポート

export default {
  data() {
    return {
      isMyTurn: false,  // 自分のターンかどうか
      turnOrder: null  // 先手後手を管理
    };
  },
  components: {
    TicTacToeBoard,  // Board.vueコンポーネントを利用
  },
  mounted() {
    // サーバーから先手後手を受け取る
    this.$socket.on('setTurnOrder', ({ turn }) => {
      this.turnOrder = turn;
      // 先手の場合、自分のターンで開始
      if (turn === 'first') {
        this.isMyTurn = true;
      }
    });

    // 自分のターンの通知を受け取る
    this.$socket.on('yourTurn', () => {
      this.isMyTurn = true;
    });
  },
  methods: {
    sendMove(move) {
      if (this.isMyTurn) {
        this.$socket.emit('makeMove', move);
        this.isMyTurn = false;  // 自分のターンを終了
      }
    },
    handleGameOver() {
      // ゲーム終了時の処理
      this.$router.push('/');  // タイトル画面にリダイレクト
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  text-align: center;
  color: red;
  font-weight: bold;
}
</style>
