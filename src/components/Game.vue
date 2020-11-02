<template>
  <div class="game">
    <div v-if="isGameRunning">
      <Controls />
      <h3>Score: {{ score }}</h3>
      <Board />
      <router-link class="about-link" to="/about">About</router-link>
    </div>
    <div v-else>
      <h3 v-if="isGameOver">GAME OVER</h3>
      <h3 v-else-if="isGameCompleted">YOU WIN</h3>
      <h3 v-if="isGameOver">Score : {{ score }}</h3>
      <button @click="restart">restart</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { RESTART_ACTION } from '@/store';
import Controls from '@/components/Controls.vue';
import Board from '@/components/Board.vue';

@Component({
  components: {
    Controls,
    Board,
  },
})
export default class Game extends Vue {
  mounted() {
    if (!this.$store.state.isGameRunning) {
      this.$store.dispatch(RESTART_ACTION);
    }
  }

  get score(): number {
    return this.$store.state.score;
  }

  get isGameRunning(): boolean {
    return this.$store.state.isGameRunning;
  }

  get isGameOver(): boolean {
    return this.$store.state.isGameOver;
  }

  get isGameCompleted(): boolean {
    return this.$store.state.isGameCompleted;
  }

  restart() {
    this.$store.dispatch(RESTART_ACTION);
  }
}
</script>

<style lang="scss" scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .about-link {
    margin-top: 5px;
    font-size: 9px;
    text-transform: uppercase;
  }
}
</style>
