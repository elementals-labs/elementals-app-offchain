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
    createMove('Blaze Shot', 'Fire', 60, 90),
    createMove('Inferno Slash', 'Fire', 50, 95),
  ]),
  createMonster(2, 'Aquara', 'Water', 85, 60, 55, 65, [
    createMove('Aqua Surge', 'Water', 65, 85),
    createMove('Wave Blast', 'Water', 50, 95),
  ]),
  createMonster(3, 'Terron', 'Earth', 90, 70, 70, 40, [
    createMove('Boulder Crash', 'Earth', 75, 80),
    createMove('Mud Strike', 'Earth', 40, 100),
  ]),
  createMonster(4, 'Zephyra', 'Air', 75, 55, 45, 85, [
    createMove('Cyclone Spin', 'Air', 60, 90),
    createMove('Wind Strike', 'Air', 40, 100),
  ]),
  createMonster(5, 'Sparky', 'Light', 78, 60, 50, 70, [
    createMove('Radiant Beam', 'Light', 80, 80),
    createMove('Blinding Flash', 'Light', 40, 100),
  ]),
  createMonster(6, 'Umbra', 'Dark', 82, 68, 52, 75, [
    createMove('Shadow Blast', 'Dark', 75, 85),
    createMove('Night Pulse', 'Dark', 60, 95),
  ]),
  createMonster(7, 'Zapper', 'Light', 75, 70, 55, 80, [
    createMove('Volt Strike', 'Light', 65, 90),
    createMove('Charge Sphere', 'Light', 55, 95),
  ]),
  createMonster(8, 'Frostbite', 'Water', 88, 62, 65, 60, [
    createMove('Frost Spike', 'Water', 70, 85),
    createMove('Chill Breath', 'Water', 55, 95),
  ]),
  createMonster(9, 'Venomous', 'Dark', 70, 75, 50, 85, [
    createMove('Venom Lash', 'Dark', 60, 95),
    createMove('Toxic Haze', 'Dark', 70, 85),
  ]),
];
