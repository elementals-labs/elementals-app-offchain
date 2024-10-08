import React from 'react';
import { Monster } from '../types';
import { Flame, Droplet, Mountain, Wind, Sun, Moon } from 'lucide-react';

interface MonsterDisplayProps {
  monster: Monster;
  isPlayer: boolean;
  animationState: 'idle' | 'attack' | 'damage';
}

const TypeIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'Fire':
      return <Flame className="text-red-500" size={16} />;
    case 'Water':
      return <Droplet className="text-blue-500" size={16} />;
    case 'Earth':
      return <Mountain className="text-brown-500" size={16} />;
    case 'Air':
      return <Wind className="text-gray-300" size={16} />;
    case 'Light':
      return <Sun className="text-yellow-500" size={16} />;
    case 'Dark':
      return <Moon className="text-purple-500" size={16} />;
    default:
      return null;
  }
};

const MonsterDisplay: React.FC<MonsterDisplayProps> = ({
  monster,
  isPlayer,
  animationState,
}) => (
  <div className={`flex flex-col items-center`}>
    <div
      className={`bg-gray-800 bg-opacity-80 rounded p-1 mb-1 inline-block`}
    >
      <div className="flex items-center space-x-2">
        <h3 className="font-bold text-green-400 text-xs sm:text-sm">{monster.name}</h3>
        <TypeIcon type={monster.type} />
      </div>
      <div className="flex items-center mt-1">
        <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-2">
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
    <div
      className={`w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 ${
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
        className={`w-full h-full object-contain ${isPlayer ? '' : 'transform scale-x-[-1]'}`}
      />
    </div>
  </div>
);

export default MonsterDisplay;