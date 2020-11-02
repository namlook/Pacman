<template>
    <div class="board">
        <div v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`" class="row">
            <TileComponent
                v-for="(tile, tileIndex) in row"
                :key="`tile-${tileIndex}`"
                :value="tile"
                />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Tile } from '@/core/types';
import TileComponent from '@/components/Tile.vue';

@Component({
  components: {
    TileComponent,
  },
})
export default class Board extends Vue {
  get rows(): Tile[][] {
    return this.$store.state.rows;
  }
}
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-direction: column;
  align-items: center;

  .row {
    background: black;
    display: flex;
  }
}
</style>
