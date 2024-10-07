import React, { useState, useCallback } from 'react';
import { Monster } from '../types';
import MonsterCard from './MonsterCard';
import WalletButton from './WalletButton';
import { monsters } from '../data/monsters';

interface TeamSelectionProps {
  onTeamSelected: (team: Monster[], address: string | null) => void;
}

const TeamSelection: React.FC<TeamSelectionProps> = ({ onTeamSelected }) => {
  const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([]);
  const [playerAddress, setPlayerAddress] = useState<string | null>(null);

  const handleMonsterSelect = (monster: Monster) => {
    if (selectedMonsters.includes(monster)) {
      setSelectedMonsters(selectedMonsters.filter((m) => m.id !== monster.id));
    } else if (selectedMonsters.length < 3) {
      setSelectedMonsters([...selectedMonsters, monster]);
    }
  };

  const handleConfirmTeam = () => {
    if (selectedMonsters.length === 3) {
      onTeamSelected(selectedMonsters, playerAddress);
    }
  };

  const handleAddressChange = useCallback((address: string | null) => {
    setPlayerAddress(address);
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-900 text-green-300 min-h-screen flex flex-col">
      <h2 className="text-3xl font-bold mb-2 text-center text-green-400">Select Your Team</h2>
      <p className="text-center mb-4 text-green-300">
        {playerAddress ? `Address: ${playerAddress.slice(0, 6)}...${playerAddress.slice(-4)}` : 'Player 1'}
      </p>
      <p className="text-center mb-4 text-green-300">Choose 3 Monsters</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20 flex-grow overflow-y-auto">
        {monsters.map((monster) => (
          <MonsterCard
            key={monster.id}
            monster={monster}
            isSelected={selectedMonsters.includes(monster)}
            onSelect={() => handleMonsterSelect(monster)}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-center items-center space-x-4">
        <WalletButton onAddressChange={handleAddressChange} />
        <button
          className="bg-green-600 text-white px-6 py-2 rounded disabled:bg-gray-600 disabled:text-gray-400 hover:bg-green-500 transition-colors"
          onClick={handleConfirmTeam}
          disabled={selectedMonsters.length !== 3}
        >
          Confirm Team ({selectedMonsters.length}/3)
        </button>
      </div>
    </div>
  );
};

export default TeamSelection;