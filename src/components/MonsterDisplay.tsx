import React from 'react';
import { Monster } from '../types';

interface MonsterDisplayProps {
  monster: Monster;
  isPlayer: boolean;
  animationState: 'idle' | 'attack' | 'damage';
}

const MonsterDisplay: React.FC<MonsterDisplayProps> = ({
  monster,
  isPlayer,
  animationState,
}) => (
  <div
    className={`flex ${
      isPlayer ? 'flex-col' : 'flex-col-reverse'
    } items-center`}
  >
    <div
      className={`w-40 h-40 ${
        animationState === 'attack'
          ? 'animate-attack'
          : animationState === 'damage'
          ? 'animate-damage'
          : ''
      }`}
    >
      <img
        src={`/img/${monster.name.toLowerCase()}.png`}
        alt={monster.name}
        className={`w-full h-full ${isPlayer ? '' : 'transform scale-x-[-1]'}`}
      />
    </div>
    <div
      className={`bg-gray-800 bg-opacity-80 rounded p-1 ${
        isPlayer ? 'mt-1' : 'mb-1'
      } w-full`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-green-400 text-sm">{monster.name}</h3>
        <span className="text-xs text-green-300 ml-1">{monster.type}</span>
      </div>
      <div className="flex items-center">
        <div className="w-24 bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(monster.hp / monster.maxHp) * 100}%` }}
          ></div>
        </div>
        <span className="ml-1 text-xs text-green-300">
          {monster.hp}/{monster.maxHp}
        </span>
      </div>
    </div>
  </div>
);

export default MonsterDisplay;
