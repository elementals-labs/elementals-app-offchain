import React, { useMemo } from 'react';
import { Monster } from '../types';
import MonsterDisplay from './MonsterDisplay';

interface BattleArenaProps {
  playerMonster: Monster;
  aiMonster: Monster;
  animationState: 'idle' | 'playerAttack' | 'aiAttack' | 'playerDamage' | 'aiDamage';
}

const battleBackgrounds = [
  '/img/battleArena1.webp',
  '/img/battleArena2.webp',
  '/img/battleArena3.webp'
];

const BattleArena: React.FC<BattleArenaProps> = ({ playerMonster, aiMonster, animationState }) => {
  const randomBackground = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * battleBackgrounds.length);
    return battleBackgrounds[randomIndex];
  }, []);

  return (
    <div className="relative mb-8 rounded-lg overflow-hidden" style={{ height: '320px' }}>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{backgroundImage: `url('${randomBackground}')`}}
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