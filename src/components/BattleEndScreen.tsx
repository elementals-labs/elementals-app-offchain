import React from 'react';
import { Player, Monster } from '../types';

interface BattleEndScreenProps {
  winner: Player;
  onPlayAgain: () => void;
}

const BattleEndScreen: React.FC<BattleEndScreenProps> = ({ winner, onPlayAgain }) => {
  const isPlayerWinner = winner.id === 1;
  const winnerName = isPlayerWinner ? "THE ELEMENTALIST" : "AI";
  const message = isPlayerWinner
    ? "You have mastered the elements and emerged victorious!"
    : "The AI prevailed this time. Train harder and try again!";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-green-300 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-400">Battle Ended</h2>
        <p className="text-xl mb-2 text-yellow-400">
          {winnerName} wins!
        </p>
        <p className="text-lg mb-6 text-green-300">
          {message}
        </p>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-green-400">Winning Team</h3>
          <div className="flex justify-center gap-4">
            {winner.team.map((monster: Monster) => (
              <div key={monster.id} className="bg-gray-700 p-2 rounded w-24">
                <img
                  src={`/img/${monster.name.toLowerCase()}.png`}
                  alt={monster.name}
                  className="w-16 h-16 mx-auto mb-2 object-contain"
                />
                <p className="text-sm font-bold truncate">{monster.name}</p>
                <p className="text-xs">HP: {monster.hp}/{monster.maxHp}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onPlayAgain}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default BattleEndScreen;