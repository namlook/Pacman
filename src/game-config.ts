import { Grid } from '@/core/types';

export const GAME_GRID: Grid = [
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

export const GAME_VELOCITY = 500;