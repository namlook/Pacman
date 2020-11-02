<template>
  <Game />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Game from '@/components/Game.vue';

@Component({
  components: {
    Game,
  },
})
export default class Home extends Vue {}
</script>
