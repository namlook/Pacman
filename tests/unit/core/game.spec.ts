import Game from '@/core/game';
import { GAME_GRID, GAME_VELOCITY } from '@/game-config';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game(GAME_GRID, GAME_VELOCITY);
  });

  it('should have a board', () => {
    expect(game.board).not.toBeNull();
  });

  it('should have a pacman', () => {
    expect(game.pacman).toEqual({ position: { x: 4, y: 2 } });
  });

  it('should have ghosts', () => {
    expect(game.ghosts).toEqual([
      { position: { x: 9, y: 10 }, id: '1' },
      { position: { x: 9, y: 10 }, id: '2' },
      { position: { x: 9, y: 10 }, id: '3' },
      { position: { x: 9, y: 10 }, id: '4' },
    ]);
  });

  describe('start()', () => {
    it(' should move ghosts every seconds', async () => {
      const initialGhosts = game.ghosts;
      game.start();
      await wait(GAME_VELOCITY + 1);
      const newGhosts = game.ghosts;
      expect(newGhosts).not.toEqual(initialGhosts);
      await wait(GAME_VELOCITY + 1);
      expect(game.ghosts).not.toEqual(newGhosts);
    });
  });

  describe('stop()', () => {
    it(' should stop ghosts from moving', async () => {
      game.start();
      const initialGhosts = game.ghosts;
      await wait(GAME_VELOCITY + 1);
      game.stop();
      const newGhosts = game.ghosts;
      expect(newGhosts).not.toEqual(initialGhosts);
      await wait(GAME_VELOCITY + 1);
      expect(game.ghosts).toEqual(newGhosts);
    });
  });

  describe('movePacman()', () => {
    it(' should move Pacman in the correct direction', async () => {
      expect(game.pacman).toEqual({ position: { x: 4, y: 2 } });
      game.movePacman('DOWN');
      expect(game.pacman).toEqual({ position: { x: 4, y: 3 } });
      game.movePacman('DOWN');
      expect(game.pacman).toEqual({ position: { x: 4, y: 4 } });
      game.movePacman('LEFT');
      expect(game.pacman).toEqual({ position: { x: 3, y: 4 } });
      game.movePacman('RIGHT');
      expect(game.pacman).toEqual({ position: { x: 4, y: 4 } });
      game.movePacman('UP');
      expect(game.pacman).toEqual({ position: { x: 4, y: 3 } });
    });
  });
});
