import React from 'react';
import { Move } from '../types';

interface MoveSelectionProps {
  moves: Move[];
  onMoveSelect: (move: Move) => void;
  disabled: boolean;
}

const MoveSelection: React.FC<MoveSelectionProps> = ({ moves, onMoveSelect, disabled }) => (
  <div className="mb-4">
    <h3 className="text-xl font-bold mb-2 text-green-400">Choose your move:</h3>
    <div className="grid grid-cols-2 gap-2">
      {moves.map((move, index) => (
        <button
          key={index}
          className={`p-2 rounded bg-gray-700 hover:bg-green-500 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => onMoveSelect(move)}
          disabled={disabled}
        >
          {move.name}
        </button>
      ))}
    </div>
  </div>
);

export default MoveSelection;