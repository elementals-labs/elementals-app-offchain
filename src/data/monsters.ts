import { Monster, ElementType, Move } from '../types';

const createMove = (
  name: string,
  type: ElementType,
  power: number,
  accuracy: number
): Move => ({
  name,
  type,
  power,
  accuracy,
});

const createMonster = (
  id: number,
  name: string,
  type: ElementType,
  hp: number,
  attack: number,
  defense: number,
  speed: number,
  moves: Move[]
): Monster => ({
  id,
  name,
  type,
  hp,
  maxHp: hp,
  attack,
  defense,
  speed,
  moves,
});

export const monsters: Monster[] = [
  createMonster(1, 'Torchy', 'Fire', 80, 65, 50, 70, [
    createMove('Fireball', 'Fire', 60, 90),
    createMove('Ember Slash', 'Fire', 50, 95),
  ]),
  createMonster(2, 'Aquara', 'Water', 85, 60, 55, 65, [
    createMove('Tidal Wave', 'Water', 65, 85),
    createMove('Bubble Beam', 'Water', 50, 95),
  ]),
  createMonster(3, 'Terron', 'Earth', 90, 70, 70, 40, [
    createMove('Rock Slide', 'Earth', 75, 80),
    createMove('Mud Slap', 'Earth', 40, 100),
  ]),
  createMonster(4, 'Zephyra', 'Air', 75, 55, 45, 85, [
    createMove('Tornado', 'Air', 60, 90),
    createMove('Gust', 'Air', 40, 100),
  ]),
  createMonster(5, 'Sparky', 'Light', 78, 60, 50, 70, [
    createMove('Solar Beam', 'Light', 80, 80),
    createMove('Flash', 'Light', 40, 100),
  ]),
  createMonster(6, 'Umbra', 'Dark', 82, 68, 52, 75, [
    createMove('Shadow Ball', 'Dark', 75, 85),
    createMove('Dark Pulse', 'Dark', 60, 95),
  ]),
  createMonster(7, 'Zapper', 'Light', 75, 70, 55, 80, [
    createMove('Thunder Shock', 'Light', 65, 90),
    createMove('Electro Ball', 'Light', 55, 95),
  ]),
  createMonster(8, 'Frostbite', 'Water', 88, 62, 65, 60, [
    createMove('Ice Shard', 'Water', 70, 85),
    createMove('Frost Breath', 'Water', 55, 95),
  ]),
  createMonster(9, 'Venomous', 'Dark', 70, 75, 50, 85, [
    createMove('Poison Sting', 'Dark', 60, 95),
    createMove('Toxic Cloud', 'Dark', 70, 85),
  ]),
];