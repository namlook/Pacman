import Board from '@/core/board';
import { Grid } from '@/core/types';

const grid: Grid = [
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 5, 5, 5, 5, 5, 5, 5, 5, 9, 5, 5, 5, 5, 5, 5, 5, 5, 9],
  [9, 5, 9, 9, 5, 9, 9, 9, 5, 9, 5, 9, 9, 9, 5, 9, 9, 5, 9],
  [9, 5, 9, 9, 5, 9, 9, 9, 5, 9, 5, 9, 9, 9, 5, 9, 9, 5, 9],
  [9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9],
  [9, 5, 9, 9, 5, 9, 5, 9, 9, 9, 9, 9, 5, 9, 5, 9, 9, 5, 9],
  [9, 5, 5, 5, 5, 9, 5, 5, 5, 9, 5, 5, 5, 9, 5, 5, 5, 5, 9],
  [9, 9, 9, 9, 5, 9, 9, 9, 5, 9, 5, 9, 9, 9, 5, 9, 9, 9, 9],
  [9, 1, 1, 9, 5, 9, 5, 5, 5, 5, 5, 5, 5, 9, 5, 9, 1, 1, 9],
  [9, 9, 9, 9, 5, 9, 5, 9, 9, 1, 9, 9, 5, 9, 5, 9, 9, 9, 9],
  [5, 5, 5, 5, 5, 5, 5, 9, 1, 1, 1, 9, 5, 5, 5, 5, 5, 5, 5],
  [9, 9, 9, 9, 5, 9, 5, 9, 9, 1, 9, 9, 5, 9, 5, 9, 9, 9, 9],
  [9, 1, 1, 9, 5, 9, 5, 5, 5, 5, 5, 5, 5, 9, 5, 9, 1, 1, 9],
  [9, 9, 9, 9, 5, 9, 9, 9, 5, 9, 5, 9, 9, 9, 5, 9, 9, 9, 9],
  [9, 5, 5, 5, 5, 9, 5, 5, 5, 9, 5, 5, 5, 9, 5, 5, 5, 5, 9],
  [9, 5, 9, 9, 5, 9, 5, 9, 9, 9, 9, 9, 5, 9, 5, 9, 9, 5, 9],
  [9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9],
  [9, 5, 9, 9, 5, 9, 9, 9, 5, 9, 5, 9, 9, 9, 5, 9, 9, 5, 9],
  [9, 5, 9, 9, 5, 9, 9, 9, 5, 9, 5, 9, 9, 9, 5, 9, 9, 5, 9],
  [9, 5, 5, 5, 5, 5, 5, 5, 5, 9, 5, 5, 5, 5, 5, 5, 5, 5, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
];

describe('Board', () => {
  let board: Board;

  beforeEach(() => {
    board = new Board(grid);
  });

  it('should have width', () => {
    expect(board.width).toEqual(19);
  });

  it('should have height', () => {
    expect(board.height).toEqual(21);
  });

  describe('getNextPositionFrom', () => {
    it('should return the upper position', () => {
      expect(board.getNextPosition({ x: 1, y: 1 }, 'UP')).toEqual({ x: 1, y: 1 });
      expect(board.getNextPosition({ x: 1, y: 2 }, 'UP')).toEqual({ x: 1, y: 1 });
    });

    it('should return the downer position', () => {
      expect(board.getNextPosition({ x: 1, y: 2 }, 'DOWN')).toEqual({ x: 1, y: 3 });
    });

    it('should return the left position', () => {
      expect(board.getNextPosition({ x: 1, y: 2 }, 'LEFT')).toEqual({ x: 1, y: 2 });
      expect(board.getNextPosition({ x: 2, y: 4 }, 'LEFT')).toEqual({ x: 1, y: 4 });
    });

    it('should return the left position', () => {
      expect(board.getNextPosition({ x: 1, y: 2 }, 'RIGHT')).toEqual({ x: 1, y: 2 });
      expect(board.getNextPosition({ x: 2, y: 4 }, 'RIGHT')).toEqual({ x: 3, y: 4 });
    });
  });

  describe('getAvailableMovesFrom', () => {
    it('should return available moves', () => {
      let moves = Array(100)
        .fill(0)
        .map(() => board.getAvailableMoves({ x: 1, y: 2 }))
        .flatMap((o) => o);
      expect(moves).toContain('UP');
      expect(moves).toContain('DOWN');
      expect(moves).not.toContain('LEFT');
      expect(moves).not.toContain('RIGHT');

      moves = Array(100)
        .fill(0)
        .map(() => board.getAvailableMoves({ x: 1, y: 1 }))
        .flatMap((o) => o);
      expect(moves).not.toContain('UP');
      expect(moves).toContain('DOWN');
      expect(moves).not.toContain('LEFT');
      expect(moves).toContain('RIGHT');

      moves = Array(100)
        .fill(0)
        .map(() => board.getAvailableMoves({ x: 9, y: 10 }))
        .flatMap((o) => o);
      expect(moves).toContain('UP');
      expect(moves).toContain('DOWN');
      expect(moves).toContain('LEFT');
      expect(moves).toContain('RIGHT');
    });
  });

  describe('getRandomMoveFrom', () => {
    it('should return a random position', () => {
      let moves = Array(10)
        .fill(0)
        .map(() => board.getRandomMove({ x: 1, y: 2 }))
        .flatMap((o) => o);
      expect(moves).toContainEqual({ x: 1, y: 1 });
      expect(moves).toContainEqual({ x: 1, y: 3 });
      expect(moves).not.toContainEqual({ x: 1, y: 2 });
      expect(moves).not.toContainEqual({ x: 2, y: 2 });

      moves = Array(10)
        .fill(0)
        .map(() => board.getRandomMove({ x: 1, y: 1 }))
        .flatMap((o) => o);
      expect(moves).not.toContainEqual({ x: 1, y: 1 });
      expect(moves).toContainEqual({ x: 1, y: 2 });
      expect(moves).not.toContainEqual({ x: 0, y: 1 });
      expect(moves).toContainEqual({ x: 2, y: 1 });
      expect(moves).not.toContainEqual({ x: 2, y: 2 });
      expect(moves).not.toContainEqual({ x: 0, y: 0 });
    });
  });
});
