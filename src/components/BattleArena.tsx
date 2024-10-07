import React from 'react';
import { Monster } from '../types';
import MonsterDisplay from './MonsterDisplay';

interface BattleArenaProps {
  playerMonster: Monster;
  aiMonster: Monster;
  animationState: 'idle' | 'playerAttack' | 'aiAttack' | 'playerDamage' | 'aiDamage';
}

const BattleArena: React.FC<BattleArenaProps> = ({ playerMonster, aiMonster, animationState }) => (
  <div className="relative mb-8 rounded-lg overflow-hidden" style={{ height: '320px' }}>
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{backgroundImage: "url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"}}
    ></div>
    <div className="relative z-10 flex justify-between h-full p-4">
      <div className="self-end">
        <MonsterDisplay 
          monster={playerMonster} 
          isPlayer={true} 
          animationState={animationState === 'playerAttack' ? 'attack' : animationState === 'playerDamage' ? 'damage' : 'idle'}
        />
      </div>
      <div className="self-start">
        <MonsterDisplay 
          monster={aiMonster} 
          isPlayer={false} 
          animationState={animationState === 'aiAttack' ? 'attack' : animationState === 'aiDamage' ? 'damage' : 'idle'}
        />
      </div>
    </div>
  </div>
);

export default BattleArena;