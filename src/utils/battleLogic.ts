import { Monster, Move, ElementType } from '../types';

const typeEffectiveness: Record<ElementType, Record<ElementType, number>> = {
  Fire: { Fire: 1, Water: 0.5, Earth: 2, Air: 1, Light: 1, Dark: 1 },
  Water: { Fire: 2, Water: 1, Earth: 0.5, Air: 1, Light: 1, Dark: 1 },
  Earth: { Fire: 0.5, Water: 2, Earth: 1, Air: 0.5, Light: 1, Dark: 1 },
  Air: { Fire: 1, Water: 1, Earth: 2, Air: 1, Light: 1, Dark: 1 },
  Light: { Fire: 1, Water: 1, Earth: 1, Air: 1, Light: 1, Dark: 2 },
  Dark: { Fire: 1, Water: 1, Earth: 1, Air: 1, Light: 2, Dark: 1 },
};

export const calculateDamage = (
  attacker: Monster,
  defender: Monster,
  move: Move
): { damage: number; isCritical: boolean; effectiveness: number } => {
  const level = 30; // Fixed level for all monsters
  const basePower = move.power;

  const attackStat = attacker.attack;
  const defenseStat = defender.defense;

  // Critical Hit Calculation
  const isCritical = Math.random() < 0.0625; // 6.25% chance
  const criticalMultiplier = isCritical ? 1.5 : 1;

  const baseDamage =
    (((2 * level) / 5 + 2) * basePower * attackStat) / (50 * defenseStat) + 2;

  // Calculate Modifier
  const randomFactor = Math.random() * (1 - 0.85) + 0.85; // Between 0.85 and 1.0
  const stab = move.type === attacker.type ? 1.5 : 1;
  const effectiveness = typeEffectiveness[move.type][defender.type] || 1;

  const modifier = randomFactor * stab * effectiveness * criticalMultiplier;

  const totalDamage = Math.floor(baseDamage * modifier);

  // Ensure minimum damage of 1
  return {
    damage: Math.max(1, totalDamage),
    isCritical,
    effectiveness,
  };
};

export const applyDamage = (monster: Monster, damage: number): Monster => {
  return {
    ...monster,
    hp: Math.max(0, monster.hp - damage),
  };
};

export const isMonsterDefeated = (monster: Monster): boolean => {
  return monster.hp <= 0;
};

export const selectAIMove = (
  aiMonster: Monster,
  opponentMonster: Monster
): Move => {
  let bestMove = aiMonster.moves[0];
  let highestDamage = 0;

  for (const move of aiMonster.moves) {
    const damage = calculateDamage(aiMonster, opponentMonster, move);
    if (damage > highestDamage) {
      highestDamage = damage;
      bestMove = move;
    }
  }

  return bestMove;
};