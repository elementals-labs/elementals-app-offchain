import React, { useState, useEffect } from 'react';
import { Monster, Move, GameState } from '../types';
import { calculateDamage, applyDamage, isMonsterDefeated, selectAIMove } from '../utils/battleLogic';
import TeamStatus from './TeamStatus';
import BattleArena from './BattleArena';
import MoveSelection from './MoveSelection';
import BattleLog from './BattleLog';

interface BattleScreenProps {
  gameState: GameState;
  onBattleEnd: (winnerId: number) => void;
  onUpdateGameState: (newState: GameState) => void;
}

const BattleScreen: React.FC<BattleScreenProps> = ({ gameState, onBattleEnd, onUpdateGameState }) => {
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [showSwitchOptions, setShowSwitchOptions] = useState(false);
  const [forceSwitch, setForceSwitch] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'playerAttack' | 'aiAttack' | 'playerDamage' | 'aiDamage'>('idle');
  const [arenaName, setArenaName] = useState("Battle Arena");
  const handleArenaSelect = (name: string) => {
    setArenaName(name);
  };
  useEffect(() => {
    if (!isPlayerTurn && !forceSwitch) {
      handleAITurn();
    }
  }, [isPlayerTurn, forceSwitch]);

  const handleMoveSelect = (move: Move) => {
    if (isPlayerTurn && !forceSwitch) {
      handlePlayerAttack(move);
    }
  };

  const handlePlayerAttack = async (move: Move) => {
    setAnimationState('playerAttack');
    await delay(500);
    
    const [playerMonster, aiMonster] = gameState.activeMonsters;
    const { damage, isCritical, effectiveness } = calculateDamage(playerMonster, aiMonster, move);
    const updatedAIMonster = applyDamage(aiMonster, damage);

    const effectivenessMessage = getEffectivenessMessage(effectiveness);
    const damageMultiplier = isCritical ? 1.5 : 1;

    const newLog = [
      `PLAYER${playerMonster.name} used |${move.name}!`,
      effectivenessMessage !== "normal" ? `EFFECT${effectivenessMessage}` : "",
      isCritical ? `CRITICAL|A critical hit!` : "",
      `AI${aiMonster.name} took |${Math.floor(damage * damageMultiplier)} damage!`
    ].filter(Boolean);

    setBattleLog([...battleLog, ...newLog]);

    setAnimationState('aiDamage');
    await delay(500);

    const newGameState = {
      ...gameState,
      player2: {
        ...gameState.player2,
        team: gameState.player2.team.map(m => m.id === updatedAIMonster.id ? updatedAIMonster : m),
      },
      activeMonsters: [playerMonster, updatedAIMonster] as [Monster, Monster],
      currentTurn: gameState.currentTurn + 1,
    };

    onUpdateGameState(newGameState);

    if (isMonsterDefeated(updatedAIMonster)) {
      handleMonsterDefeat(gameState.player2, newGameState);
    } else {
      setAnimationState('idle');
      setIsPlayerTurn(false);
    }
  };

  const handleAITurn = async () => {
    await delay(500);
    setAnimationState('aiAttack');
    await delay(500);

    const [playerMonster, aiMonster] = gameState.activeMonsters;
    const aiMove = selectAIMove(aiMonster, playerMonster);
    const { damage, isCritical, effectiveness } = calculateDamage(
      aiMonster,
      playerMonster,
      aiMove
    );

    const updatedPlayerMonster = applyDamage(playerMonster, damage);

    const effectivenessMessage = getEffectivenessMessage(effectiveness);

    const newLog = [
      `AI${aiMonster.name} used |${aiMove.name}!`,
      effectivenessMessage !== "normal" ? `EFFECT${effectivenessMessage}` : "",
      isCritical ? 'CRITICAL|A critical hit!' : '',
      `PLAYER${playerMonster.name} took |${damage} damage!`,
    ].filter(Boolean);

    setBattleLog([...battleLog, ...newLog]);

    setAnimationState('playerDamage');
    await delay(500);

    const newGameState = {
      ...gameState,
      player1: {
        ...gameState.player1,
        team: gameState.player1.team.map((m) =>
          m.id === updatedPlayerMonster.id ? updatedPlayerMonster : m
        ),
      },
      activeMonsters: [updatedPlayerMonster, aiMonster] as [Monster, Monster],
      currentTurn: gameState.currentTurn + 1,
    };

    onUpdateGameState(newGameState);

    if (isMonsterDefeated(updatedPlayerMonster)) {
      handleMonsterDefeat(gameState.player1, newGameState);
    } else {
      setAnimationState('idle');
      setIsPlayerTurn(true);
    }
  };

  const handleMonsterDefeat = (player: typeof gameState.player1, currentGameState: GameState) => {
    const remainingMonsters = player.team.filter(m => !isMonsterDefeated(m) && m.id !== currentGameState.activeMonsters[player.id - 1].id);
    if (remainingMonsters.length === 0) {
      onBattleEnd(player.id === 1 ? 2 : 1);
    } else {
      if (player.id === 1) {
        setForceSwitch(true);
        setShowSwitchOptions(true);
        setBattleLog([...battleLog, `PLAYER${currentGameState.activeMonsters[0].name} |fainted!`]);
      } else {
        const newActiveMonster = remainingMonsters[0];
        const newGameState = {
          ...currentGameState,
          player2: {
            ...currentGameState.player2,
            team: currentGameState.player2.team.map(m => m.id === newActiveMonster.id ? newActiveMonster : m),
          },
          activeMonsters: [currentGameState.activeMonsters[0], newActiveMonster] as [Monster, Monster],
        };
        onUpdateGameState(newGameState);
        setBattleLog([...battleLog, 
          `AI${currentGameState.activeMonsters[1].name} |fainted!`,
          `AI${currentGameState.player2.name} |sent out |${newActiveMonster.name}!`
        ]);
        setIsPlayerTurn(true);
      }
    }
    setAnimationState('idle');
  };

  const handleSwitchMonster = () => {
    setShowSwitchOptions(true);
  };

  const handleMonsterSwitch = (newMonster: Monster) => {
    const [currentMonster, aiMonster] = gameState.activeMonsters;
    const newGameState = {
      ...gameState,
      player1: {
        ...gameState.player1,
        team: gameState.player1.team.map(m => 
          m.id === newMonster.id ? newMonster : 
          m.id === currentMonster.id ? currentMonster : m
        ),
      },
      activeMonsters: [newMonster, aiMonster] as [Monster, Monster],
      currentTurn: forceSwitch ? gameState.currentTurn : gameState.currentTurn + 1,
    };

    onUpdateGameState(newGameState);
    setBattleLog([...battleLog, `PLAYER${gameState.player1.name} |withdrew |${currentMonster.name}!`, `PLAYER${gameState.player1.name} |sent out |${newMonster.name}!`]);
    setShowSwitchOptions(false);
    setForceSwitch(false);
    setIsPlayerTurn(forceSwitch);  // If it was a forced switch, it's still the player's turn
  };

  const getEffectivenessMessage = (effectiveness: number): string => {
    if (effectiveness > 1) return 'It\'s super effective!';
    if (effectiveness < 1) return 'It\'s not very effective...';
    return "normal";
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const availableMonsters = gameState.player1.team.filter(m => !isMonsterDefeated(m) && m.id !== gameState.activeMonsters[0].id);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-900 text-green-300">
      <div className="flex justify-between items-center mb-4">
        <TeamStatus player={gameState.player1} />
        <h2 className="text-2xl font-bold text-center text-green-400">{arenaName}</h2>
        <TeamStatus player={gameState.player2} />
      </div>
      <BattleArena
        playerMonster={gameState.activeMonsters[0]}
        aiMonster={gameState.activeMonsters[1]}
        animationState={animationState}
        onArenaSelect={handleArenaSelect}
      />
      {!showSwitchOptions && !forceSwitch && (
        <>
          <MoveSelection
            moves={gameState.activeMonsters[0].moves}
            onMoveSelect={handleMoveSelect}
            disabled={!isPlayerTurn || animationState !== 'idle'}
          />
          <button
            className="w-full bg-green-600 text-white py-2 rounded mb-4 hover:bg-green-500 transition-colors disabled:bg-gray-600 disabled:text-gray-400"
            onClick={handleSwitchMonster}
            disabled={!isPlayerTurn || availableMonsters.length === 0 || animationState !== 'idle'}
          >
            Switch Monster
          </button>
        </>
      )}
      {(showSwitchOptions || forceSwitch) && (
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 text-green-400">
            {forceSwitch ? "Your monster was defeated! Choose your next monster:" : "Choose a monster to switch:"}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {availableMonsters.map((monster) => (
              <button
                key={monster.id}
                className="p-2 rounded bg-gray-700 hover:bg-green-500 transition-colors"
                onClick={() => handleMonsterSwitch(monster)}
              >
                {monster.name} (HP: {monster.hp}/{monster.maxHp})
              </button>
            ))}
          </div>
          {!forceSwitch && (
            <button
              className="w-full bg-red-600 text-white py-2 rounded mt-2 hover:bg-red-500 transition-colors"
              onClick={() => setShowSwitchOptions(false)}
            >
              Cancel
            </button>
          )}
        </div>
      )}
      <BattleLog logs={battleLog} />
    </div>
  );
};

export default BattleScreen;