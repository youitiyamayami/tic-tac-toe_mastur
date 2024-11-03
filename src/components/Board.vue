<template>
  <div class="board-container">
    <div v-if="winner" class="winner-message">
      勝者: {{ winner }}
      <button @click="endGame">タイトルに戻る</button>
    </div>
    <div v-else-if="isDraw" class="draw-message">
      引き分けです！
      <button @click="endGame">タイトルに戻る</button>
    </div>
    <div v-else class="board">
      <div class="board-row" v-for="(row, rowIndex) in 3" :key="rowIndex">
        <Square 
          v-for="(col, colIndex) in 3" 
          :key="colIndex"
          :value="localSquares[rowIndex * 3 + colIndex]" 
          @click="handleClick(rowIndex * 3 + colIndex)" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import Square from './Square.vue';

export default {
  name: "TicTacToeBoard",
  components: { Square },
  props: {
    squares: Array,    // 外部から受け取る初期状態
    disabled: Boolean  // 他のプレイヤーが入力中の時は操作を無効化する
  },
  data() {
    return {
      localSquares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      isDraw: false,
    };
  },
  watch: {
    squares: {
      immediate: true,
      handler(newVal) {
        if (Array.isArray(newVal)) {
          this.localSquares = [...newVal];  // squaresの変更をlocalSquaresに反映
        }
      }
    }
  },
  methods: {
    handleClick(index) {
      if (this.localSquares[index] || this.winner || this.isDraw || this.disabled) return;

      const newSquares = [...this.localSquares];
      newSquares[index] = this.xIsNext ? '○' : '×';
      this.localSquares = newSquares;

      this.winner = this.calculateWinner(newSquares);

      if (!this.winner && newSquares.every(square => square !== null)) {
        this.isDraw = true;
      }

      if (!this.winner && !this.isDraw) {
        this.xIsNext = !this.xIsNext;
        this.$emit('make-move', { index, symbol: newSquares[index] });  // 親コンポーネントに変更を通知
      }
    },
    calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    },
    endGame() {
      this.$emit('game-over');
    },
    resetGame() {
      this.localSquares = Array(9).fill(null);
      this.xIsNext = true;
      this.winner = null;
      this.isDraw = false;
    },
  }
};
</script>

<style>
.board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.board {
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.board-row {
  display: flex;
}

.winner-message, .draw-message {
  font-size: 24px;
  font-weight: bold;
  color: green;
  margin-bottom: 20px;
}

.draw-message {
  color: orange;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
