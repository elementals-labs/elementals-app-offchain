import React, { useState } from 'react';
import LearnModal from './LearnModal';
import { Twitter } from 'lucide-react';

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
        <div className="flex space-x-4 mt-60">
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
        <a
          href="https://twitter.com/ElementalsLab"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-blue-400 text-white px-6 py-2 rounded text-xl font-bold hover:bg-blue-500 transition-colors flex items-center"
        >
          <Twitter className="mr-2" size={24} />
          Follow us
        </a>
      </div>
      <LearnModal isOpen={isLearnModalOpen} onClose={() => setIsLearnModalOpen(false)} />
    </div>
  );
};

export default LandingPage;