import React, { useEffect, useRef } from 'react';

interface BattleLogProps {
  logs: string[];
}

const BattleLog: React.FC<BattleLogProps> = ({ logs }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg h-48 overflow-y-auto font-mono text-sm" ref={logContainerRef}>
      <h3 className="text-xl font-bold mb-2 text-green-400 top-0 bg-gray-800 pb-2">Battle Log:</h3>
      {logs.map((log, index) => {
        const parts = log.split('|');
        return (
          <p key={index} className="mb-1 leading-tight">
            {parts.map((part, i) => {
              if (part.startsWith('PLAYER')) {
                return <span key={i} className="text-blue-400">{part.replace('PLAYER', '')}</span>;
              } else if (part.startsWith('AI')) {
                return <span key={i} className="text-red-400">{part.replace('AI', '')}</span>;
              } else if (part.startsWith('EFFECT')) {
                return <span key={i} className="text-yellow-400 italic">{part.replace('EFFECT', '')}</span>;
              } else if (part.startsWith('CRITICAL')) {
                return <span key={i} className="text-green-400 font-bold">{part.replace('CRITICAL', '')}</span>;
              } else {
                return <span key={i} className="text-green-300">{part}</span>;
              }
            })}
          </p>
        );
      })}
    </div>
  );
};

export default BattleLog;