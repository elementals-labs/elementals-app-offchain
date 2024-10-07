import React from 'react';
import { Monster } from '../types';

interface TeamStatusProps {
  player: {
    name: string;
    team: Monster[];
    address?: string | null;
  };
}

const TeamStatus: React.FC<TeamStatusProps> = ({ player }) => (
  <div className="bg-gray-800 p-2 rounded-lg shadow">
    <h4 className="text-sm font-bold text-green-400 mb-1">
      {player.address
        ? `${player.address.slice(0, 4)}...${player.address.slice(-4)}`
        : player.name}
    </h4>
    {player.team.map((monster, index) => (
      <div key={index} className="flex items-center justify-between text-xs text-green-300">
        <span>{monster.name}</span>
        <span className={monster.hp <= 0 ? 'text-red-500' : 'text-green-500'}>
          {monster.hp <= 0 ? 'Defeated' : `HP: ${monster.hp}/${monster.maxHp}`}
        </span>
      </div>
    ))}
  </div>
);

export default TeamStatus;