import React, { useState } from 'react';
import { Monster, Player, GameState } from './types';
import LandingPage from './components/LandingPage';
import TeamSelection from './components/TeamSelection';
import BattleScreen from './components/BattleScreen';
import BattleEndScreen from './components/BattleEndScreen';
import { monsters } from './data/monsters';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [showTeamSelection, setShowTeamSelection] = useState(false);

  const handleTeamSelected = (team: Monster[], address: string | null) => {
    if (!gameState) {
      const player1: Player = { id: 1, name: address ? `${address.slice(0, 4)}...${address.slice(-4)}` : 'Player 1', team, address };
      const aiTeam = selectRandomTeam();
      const player2: Player = { id: 2, name: 'AI Player', team: aiTeam };
      setGameState({
        player1,
        player2,
        currentTurn: 0,
        activeMonsters: [team[0], aiTeam[0]],
      });
    }
  };

  const selectRandomTeam = (): Monster[] => {
    const shuffled = [...monsters].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleUpdateGameState = (newState: GameState) => {
    setGameState(newState);
  };

  const handleBattleEnd = (winnerId: number) => {
    const winningPlayer = winnerId === 1 ? gameState!.player1 : gameState!.player2;
    setWinner(winningPlayer);
  };

  const handlePlayAgain = () => {
    setGameState(null);
    setWinner(null);
    setShowLanding(true);
    setShowTeamSelection(false);
  };

  const handlePlayClick = () => {
    setShowLanding(false);
    setShowTeamSelection(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {showLanding && (
        <LandingPage onPlayClick={handlePlayClick} />
      )}
      {showTeamSelection && !gameState && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-4xl">
            <TeamSelection onTeamSelected={handleTeamSelected} />
          </div>
        </div>
      )}
      {gameState && !winner && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-4xl">
            <BattleScreen
              gameState={gameState}
              onBattleEnd={handleBattleEnd}
              onUpdateGameState={handleUpdateGameState}
            />
          </div>
        </div>
      )}
      {winner && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-4xl">
            <BattleEndScreen winner={winner} onPlayAgain={handlePlayAgain} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;