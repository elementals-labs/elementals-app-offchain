import React, { useMemo } from 'react';
import { Monster } from '../types';
import MonsterDisplay from './MonsterDisplay';

interface BattleArenaProps {
  playerMonster: Monster;
  aiMonster: Monster;
  animationState: 'idle' | 'playerAttack' | 'aiAttack' | 'playerDamage' | 'aiDamage';
  onArenaSelect: (arenaName: string) => void;
}
interface ArenaInfo {
  name: string;
  image: string;
}

const battleArenas: ArenaInfo[] = [
  { name: "City Arena", image: '/img/battleArena1.webp' },
  { name: "Pond Arena", image: '/img/battleArena2.webp' },
  { name: "Forest Arena", image: '/img/battleArena3.webp' }
];

const BattleArena: React.FC<BattleArenaProps> = ({ playerMonster, aiMonster, animationState, onArenaSelect }) => {
  const randomArena = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * battleArenas.length);
    return battleArenas[randomIndex];
  }, []);

// Call onArenaSelect when the component mounts
React.useEffect(() => {
  onArenaSelect(randomArena.name);
}, [onArenaSelect, randomArena.name]);

  return (
    <div className="relative mb-8 rounded-lg overflow-hidden" style={{ height: '320px' }}>
       <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{backgroundImage: `url('${randomArena.image}')`}}
      ></div>
      <div className="relative z-10 flex justify-between items-stretch h-full px-4 sm:px-8 md:px-16 max-w-3xl mx-auto">
        <div className="w-1/2 flex justify-start items-end pb-4 sm:pb-8">
          <MonsterDisplay 
            monster={playerMonster} 
            isPlayer={true} 
            animationState={animationState === 'playerAttack' ? 'attack' : animationState === 'playerDamage' ? 'damage' : 'idle'}
          />
        </div>
        <div className="w-1/2 flex justify-end items-end pb-8 sm:pb-12">
          <MonsterDisplay 
            monster={aiMonster} 
            isPlayer={false} 
            animationState={animationState === 'aiAttack' ? 'attack' : animationState === 'aiDamage' ? 'damage' : 'idle'}
          />
        </div>
      </div>
    </div>
  );
};

export default BattleArena;