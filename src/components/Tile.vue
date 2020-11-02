<template>
  <img :src="url" class="tile" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Tile as TileInterface } from '@/core/types';

import PACMAN_IMG_URL from '@/assets/images/pacman.gif';
import GHOST1_IMG_URL from '@/assets/images/ghost-blue.gif';
import GHOST2_IMG_URL from '@/assets/images/ghost-orange.gif';
import GHOST3_IMG_URL from '@/assets/images/ghost-red.gif';
import GHOST4_IMG_URL from '@/assets/images/ghost-green.gif';
import VOID_IMG_URL from '@/assets/images/void.gif';
import CANDY_IMG_URL from '@/assets/images/candy.gif';
import BLOCK_IMG_URL from '@/assets/images/block.gif';

const ASSETS: { [key: string]: string } = {
  pacman: PACMAN_IMG_URL,
  'ghost-1': GHOST1_IMG_URL,
  'ghost-2': GHOST2_IMG_URL,
  'ghost-3': GHOST3_IMG_URL,
  'ghost-4': GHOST4_IMG_URL,
  void: VOID_IMG_URL,
  candy: CANDY_IMG_URL,
  block: BLOCK_IMG_URL,
};

@Component
export default class Tile extends Vue {
  @Prop({ type: Object, required: true }) value!: TileInterface;

  get url(): string {
    return ASSETS[this.value.id];
  }
}
</script>

<style lang="scss" scoped>
.tile {
  height: 25px;
  width: 25px;
}
</style>
