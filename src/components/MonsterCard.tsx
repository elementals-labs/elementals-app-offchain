import React from 'react';
import { Monster } from '../types';
import { Flame, Droplet, Mountain, Wind, Sun, Moon } from 'lucide-react';

interface MonsterCardProps {
  monster: Monster;
  isSelected: boolean;
  onSelect: () => void;
}

const TypeIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'Fire':
      return <Flame className="text-red-500" />;
    case 'Water':
      return <Droplet className="text-blue-500" />;
    case 'Earth':
      return <Mountain className="text-brown-500" />;
    case 'Air':
      return <Wind className="text-gray-300" />;
    case 'Light':
      return <Sun className="text-yellow-500" />;
    case 'Dark':
      return <Moon className="text-purple-500" />;
    default:
      return null;
  }
};

const MonsterCard: React.FC<MonsterCardProps> = ({
  monster,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`flex flex-col items-center border rounded-lg cursor-pointer transition-colors overflow-hidden ${
        isSelected
          ? 'bg-green-700 border-green-500'
          : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
      }`}
      onClick={onSelect}
    >
      <div className="w-full bg-gray-900 p-4 flex justify-center">
        <img
          src={`/img/${monster.name.toLowerCase()}.png`}
          alt={monster.name}
          className="w-24 h-24"
        />
      </div>
      <div className="w-full p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-green-300">{monster.name}</h3>
          <TypeIcon type={monster.type} />
        </div>
        <div className="border-t border-green-600 mb-3"></div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-green-200">
          <p>HP: {monster.hp}</p>
          <p>ATK: {monster.attack}</p>
          <p>DEF: {monster.defense}</p>
          <p>SPD: {monster.speed}</p>
        </div>
      </div>
    </div>
  );
};

export default MonsterCard;