import { Direction } from '@/core/types';
import { MOVE_PACMAN_ACTION } from '@/store';
import { Component, Vue } from 'vue-property-decorator';

const KEYBOARD_DIRECTION_MAPPING: { [key: string]: Direction } = {
  ArrowDown: 'DOWN',
  ArrowUp: 'UP',
  ArrowRight: 'RIGHT',
  ArrowLeft: 'LEFT',
};

@Component
export default class Controls extends Vue {
  keyboardListener: undefined | ((event: KeyboardEvent) => void);

  mounted() {
    this.keyboardListener = (event: KeyboardEvent) => {
      if (
        this.$store.state.isGameRunning
        && ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)
      ) {
        event.preventDefault();
        this.$store.dispatch(MOVE_PACMAN_ACTION, KEYBOARD_DIRECTION_MAPPING[event.key]);
      }
    };
    document.addEventListener('keydown', this.keyboardListener);
  }

  beforeDestroy() {
    if (this.keyboardListener) {
      document.removeEventListener('keydown', this.keyboardListener);
    }
  }
}
