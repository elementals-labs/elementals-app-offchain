import React, { useState } from 'react';
import LearnModal from './LearnModal';

interface LandingPageProps {
  onPlayClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onPlayClick }) => {
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <img
        src="/img/landing-background.png"
        alt="Landing Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="flex space-x-4 mt-20">
          <button
            onClick={onPlayClick}
            className="bg-green-600 text-white px-6 py-2 rounded text-xl font-bold hover:bg-green-500 transition-colors w-40"
          >
            Play!
          </button>
          <button
            onClick={() => setIsLearnModalOpen(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded text-xl font-bold hover:bg-purple-500 transition-colors w-40"
          >
            Learn
          </button>
        </div>
      </div>
      <LearnModal isOpen={isLearnModalOpen} onClose={() => setIsLearnModalOpen(false)} />
    </div>
  );
};

export default LandingPage;