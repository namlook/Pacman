import Game, { GAME_CHANGED_EVENT, GAME_COMPLETED_EVENT, GAME_OVER_EVENT } from '@/core/game';
import {
  Direction, Ghost, Pacman, Tile,
} from '@/core/types';
import { GAME_GRID, GAME_VELOCITY } from '@/game-config';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

const UPDATE_MUTATION = 'updateMutation';
const RESET_MUTATION = 'resetMutation';
const START_MUTATION = 'startMutation';
const STOP_MUTATION = 'stopMutation';
const GAME_OVER_MUTATION = 'gameOverMutation';
const GAME_COMPLETED_MUTATION = 'gameCompletedMutation';

export const RESTART_ACTION = 'restartAction';
export const MOVE_PACMAN_ACTION = 'movePacmanAction';

const game = new Game(GAME_GRID, GAME_VELOCITY);

export interface StoreState {
  score: number;
  rows: Tile[][];
  ghosts: Ghost[];
  pacman: Pacman;
  isGameRunning: boolean;
  isGameOver: boolean;
  isGameCompleted: boolean;
}

const gamePlugin = (store: Store<StoreState>) => {
  game.emitter.on(GAME_CHANGED_EVENT, () => {
    store.commit(UPDATE_MUTATION, {
      score: game.score,
      pacman: game.pacman,
      ghosts: game.ghosts,
      rows: game.getTiles(),
    });
  });

  game.emitter.on(GAME_OVER_EVENT, () => {
    store.commit(GAME_OVER_MUTATION);
    store.commit(STOP_MUTATION);
  });

  game.emitter.on(GAME_COMPLETED_EVENT, () => {
    store.commit(GAME_COMPLETED_MUTATION);
    store.commit(STOP_MUTATION);
  });
};

export default new Vuex.Store({
  state: {
    score: 0,
    rows: game.getTiles(),
    ghosts: game.ghosts,
    pacman: game.pacman,
    isGameRunning: false,
    isGameOver: false,
    isGameCompleted: false,
  },
  mutations: {
    [UPDATE_MUTATION](state, {
      pacman, ghosts, rows, score,
    }) {
      state.pacman = { ...pacman };
      state.ghosts = [...ghosts];
      state.rows = [...rows];
      state.score = score;
    },
    [RESET_MUTATION](state) {
      game.reset();
      const { pacman, ghosts } = game;
      state.pacman = pacman;
      state.ghosts = ghosts;
      state.score = 0;
      state.rows = [...game.getTiles()];
    },
    [START_MUTATION](state) {
      game.start();
      state.isGameRunning = true;
      state.isGameOver = false;
      state.isGameCompleted = false;
    },
    [GAME_OVER_MUTATION](state) {
      state.isGameOver = true;
    },
    [GAME_COMPLETED_MUTATION](state) {
      state.isGameCompleted = true;
    },
    [STOP_MUTATION](state) {
      state.isGameRunning = false;
      game.stop();
    },
  },
  actions: {
    [RESTART_ACTION]({ commit }) {
      commit(RESET_MUTATION);
      commit(START_MUTATION);
    },
    [MOVE_PACMAN_ACTION](_, direction: Direction) {
      game.movePacman(direction);
    },
  },
  modules: {},
  plugins: [gamePlugin],
});
