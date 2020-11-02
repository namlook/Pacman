import { EventEmitter } from 'events';
import Board, { buildCoordinates } from './board';
import {
  BLOCK,
  CANDY,
  Direction,
  GHOST,
  Ghost,
  Grid,
  PACMAN,
  Pacman,
  Position,
  Tile,
  VOID,
} from './types';

export const GAME_CHANGED_EVENT = 'GAME_CHANGED_EVENT';
export const GAME_OVER_EVENT = 'GAME_OVER_EVENT';
export const GAME_COMPLETED_EVENT = 'GAME_SUCCEED_EVENT';

export default class Game {
  private loop: number | null = null;

  emitter = new EventEmitter();

  score = 0;

  board: Board;

  pacman: Pacman = { position: { x: 4, y: 2 } };

  ghosts: Ghost[] = [
    { position: { x: 9, y: 10 }, id: '1' },
    { position: { x: 9, y: 10 }, id: '2' },
    { position: { x: 9, y: 10 }, id: '3' },
    { position: { x: 9, y: 10 }, id: '4' },
  ];

  constructor(private grid: Grid, private velocity = 500) {
    this.grid = grid;
    this.board = new Board(grid);
    this.velocity = velocity;
  }

  reset() {
    this.stop();
    this.score = 0;
    this.pacman = { position: { x: 4, y: 2 } };
    this.ghosts = [
      { position: { x: 9, y: 10 }, id: '1' },
      { position: { x: 9, y: 10 }, id: '2' },
      { position: { x: 9, y: 10 }, id: '3' },
      { position: { x: 9, y: 10 }, id: '4' },
    ];
    this.board = new Board(this.grid);
    this.start();
  }

  private tick() {
    this.ghosts = this.ghosts.map((ghost) => {
      const newPosition = this.board.getRandomMove(ghost.position);
      return { ...ghost, position: newPosition };
    });

    if (this.isPacmanGettingEaten(this.pacman.position)) {
      this.emitter.emit(GAME_OVER_EVENT);
    } else {
      this.emitter.emit(GAME_CHANGED_EVENT);
    }
  }

  start() {
    if (!this.isRunning) {
      this.loop = setInterval(() => this.tick(), this.velocity);
    }
  }

  stop() {
    if (this.loop) {
      clearInterval(this.loop);
      this.loop = null;
    }
  }

  get isRunning(): boolean {
    return !!this.loop;
  }

  private isPacmanGettingEaten(pacmanPosition: Position): boolean {
    const pacmanNewCoordinates = buildCoordinates(pacmanPosition);
    const ghostCoordinates = this.ghosts.map(({ position }) => buildCoordinates(position));
    return ghostCoordinates.includes(pacmanNewCoordinates);
  }

  movePacman(direction: Direction): void {
    const currentPosition = this.pacman.position;

    // remove the candy in the current pacman position
    this.board.updateGrid(currentPosition, VOID);

    // get the next postion of pacman
    const newPosition = this.board.getNextPosition(currentPosition, direction);

    // keep track of score
    if (this.board.getAt(newPosition) === CANDY) {
      this.score += 1;
    }

    // emit events
    if (this.isPacmanGettingEaten(currentPosition) || this.isPacmanGettingEaten(newPosition)) {
      /*
       * Check if the game is over.
       * It's the case if
       *  - Pacman is stepping on a ghost on its next move,
       *  - Pacman's current position is occupied by a ghost
       */
      this.emitter.emit(GAME_OVER_EVENT);
    } else if (this.board.nbTotalCandies - 1 === this.score) {
      /*
       * Check if the game is completed (ie: all candies have been eaten)
       * Note that pacman is eating the first candy at its first position
       * so the score should be nbTotalCandies - 1
       */
      this.emitter.emit(GAME_COMPLETED_EVENT);
    } else {
      /*
       * If the game is still running, update the pacman
       * position with the new one.
       */
      this.pacman = {
        ...this.pacman,
        position: newPosition,
      };
      this.emitter.emit(GAME_CHANGED_EVENT);
    }
  }

  getTiles(): Tile[][] {
    let creatureTileMapping: { [key: string]: Tile } = {
      [buildCoordinates(this.pacman.position)]: { type: PACMAN, id: 'pacman' },
    };

    this.ghosts.forEach((ghost, index) => {
      creatureTileMapping = {
        ...creatureTileMapping,
        [buildCoordinates(ghost.position)]: { type: GHOST, id: `ghost-${index + 1}` },
      };
    });

    return this.board.grid.map((row, y) => row.map((tileType, x) => {
      const tile = creatureTileMapping[buildCoordinates({ x, y })];
      if (tile) {
        return tile;
      }
      let id;
      switch (tileType) {
        case CANDY:
          id = 'candy';
          break;
        case BLOCK:
          id = 'block';
          break;
        case VOID:
          id = 'void';
          break;
        default:
          id = '';
      }
      return { type: tileType, id };
    }));
  }
}
