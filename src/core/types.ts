export const PACMAN = 100;
export const GHOST = 10;
export const BLOCK = 9;
export const CANDY = 5;
export const VOID = 1;

export type GridItem = typeof BLOCK | typeof CANDY | typeof VOID
export type Grid = GridItem[][]

export const UP = 'UP';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';

export type Direction = typeof UP | typeof DOWN | typeof LEFT | typeof RIGHT

export type Position = {x: number; y: number}

export interface Creature {
    position: Position;
}

export type Pacman = Creature

export interface Ghost extends Creature {
    id: string;
}

export type TileType = typeof PACMAN | typeof GHOST | GridItem

export interface Tile {
    type: TileType;
    id: string;
}
