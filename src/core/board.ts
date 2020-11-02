import {
  Grid, GridItem, Position, Direction, CANDY, BLOCK,
} from './types';

export const buildCoordinates = (position: Position): string => `${position.x},${position.y}`;

export default class Board {
    public nbTotalCandies = 0

    constructor(public grid: Grid) {
      this.grid = [...grid.map((row) => [...row])];

      let nbTotalCandies = 0;
      grid.forEach((row) => row.forEach((item) => {
        if (item === CANDY) {
          nbTotalCandies += 1;
        }
      }));
      this.nbTotalCandies = nbTotalCandies;
    }

    getAt(position: Position): GridItem | undefined {
      if (!position) {
        return undefined;
      }
      const { x, y } = position;
      try {
        return this.grid[y][x];
      } catch {
        return undefined;
      }
    }

    get height(): number {
      return this.grid.length;
    }

    get width(): number {
      return this.grid[0].length;
    }

    updateGrid(position: Position, item: GridItem) {
      const { x, y } = position;
      this.grid[y][x] = item;
    }

    getNextPosition(currentPosition: Position, direction: Direction): Position {
      const { x, y } = currentPosition;
      let newPosition;
      switch (direction) {
        case 'UP':
          newPosition = { x, y: y - 1 };
          break;
        case 'DOWN':
          newPosition = { x, y: y + 1 };
          break;
        case 'LEFT':
          newPosition = { x: x - 1, y };
          break;
        case 'RIGHT':
          newPosition = { x: x + 1, y };
          break;
        default:
          newPosition = currentPosition;
      }
      const item = this.getAt(newPosition);
      if (!item || item === BLOCK) {
        return currentPosition;
      }
      return newPosition;
    }

    getAvailableMoves(currentPosition: Position): Direction[] {
      const moves = {
        UP: this.getNextPosition(currentPosition, 'UP'),
        DOWN: this.getNextPosition(currentPosition, 'DOWN'),
        LEFT: this.getNextPosition(currentPosition, 'LEFT'),
        RIGHT: this.getNextPosition(currentPosition, 'RIGHT'),
      };

      const { x: currentX, y: currentY } = currentPosition;

      return (Object.keys(moves) as Direction[]).reduce((acc, direction) => {
        const { x, y } = moves[direction];
        if (x === currentX && y === currentY) {
          return acc;
        }
        return [...acc, direction];
      }, ([] as Direction[]));
    }

    getRandomMove(currentPosition: Position): Position {
      const directions: Direction[] = this.getAvailableMoves(currentPosition);
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      const result = this.getNextPosition(currentPosition, randomDirection);
      return result;
    }
}
