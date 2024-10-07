export type ElementType = 'Fire' | 'Water' | 'Earth' | 'Air' | 'Light' | 'Dark';

export interface Monster {
  id: number;
  name: string;
  type: ElementType;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  moves: Move[];
}

export interface Move {
  name: string;
  type: ElementType;
  power: number;
  accuracy: number;
}

export interface Player {
  id: number;
  name: string;
  team: Monster[];
  address?: string;
}

export interface GameState {
  player1: Player;
  player2: Player;
  currentTurn: number;
  activeMonsters: [Monster, Monster];
}