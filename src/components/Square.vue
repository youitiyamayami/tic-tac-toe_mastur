<template>
  <button class="square" @click="handleClick">
    {{ value }}
  </button>
</template>

<script>
export default {
  name: "TicTacToeSquare",
  props: {
    value: String
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
}
</script>

<style>
.square {
  width: 100px;
  height: 100px;
  font-size: 72px; /* 3倍に拡大 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #333; /* 全てのマスにデフォルトの線 */
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.board-row .square {
  border-left: none; /* 各行の最初のマスの左の線を消す */
}

.board-row:last-child .square {
  border-bottom: none; /* 最終行の下の線を消す */
}

.square:nth-child(1),
.square:nth-child(4),
.square:nth-child(7) {
  border-left: none; /* 左端の列の左の線を消す */
}

.square:nth-child(3),
.square:nth-child(6),
.square:nth-child(9) {
  border-right: none; /* 右端の列の右の線を消す */
}

.square:nth-child(7),
.square:nth-child(8),
.square:nth-child(9) {
  border-bottom: none; /* 最下段のマスの下の線を消す */
}
</style>
