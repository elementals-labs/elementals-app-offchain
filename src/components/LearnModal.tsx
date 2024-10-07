import React from 'react';
import { X } from 'lucide-react';

interface LearnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnModal: React.FC<LearnModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-yellow-400">Discover the World of Elementals</h2>
            <button onClick={onClose} className="text-yellow-400 hover:text-yellow-300">
              <X size={24} />
            </button>
          </div>
          
          <p className="text-blue-300">
            In a universe forged by elemental forces, Elementals—living embodiments of nature's power—roam free. Journey through diverse environments, from fiery mountains to tranquil seas, bonding with these creatures and mastering their abilities.
          </p>
          
          <p className="text-blue-300">
            As an Elementalist, your true challenge lies in strategic, turn-based battles. Command your Elementals, unleash their powers, and outsmart opponents to rise as a legend in this vibrant world.
          </p>
          
          <h3 className="text-2xl font-bold text-purple-400 mt-8">Core Values</h3>
          <ul className="list-disc list-inside text-blue-300 space-y-2">
            <li><span className="font-bold text-green-400">Fun-First Gameplay:</span> We prioritize engaging, fun experiences at every step.</li>
            <li><span className="font-bold text-green-400">Skill-Based Win-to-Earn Economy:</span> Victory isn't bought—it's earned through strategy and skill. Your success translates to real tickets.</li>
            <li><span className="font-bold text-green-400">Seamless Blockchain:</span> Enjoy secure ownership of assets without sacrificing immersive gameplay.</li>
            <li><span className="font-bold text-green-400">Sustainable Economy:</span> Our balanced economic system keeps things simple and fair.</li>
          </ul>
          
          <h3 className="text-2xl font-bold text-purple-400 mt-8">Gameplay Highlights</h3>
          <ul className="list-disc list-inside text-blue-300 space-y-2">
            <li><span className="font-bold text-green-400">Build Your Team:</span> Mint up to three Elementals with low fees and dive right into the action.</li>
            <li><span className="font-bold text-green-400">Train & Compete:</span> Sharpen your skills in the JustForFun server, then enter competitive matches for tickets.</li>
            <li><span className="font-bold text-green-400">Win-to-Earn:</span> Battle strategically to earn tickets, which can be redeemed for real value. Your skill determines your earnings.</li>
          </ul>
          
          <h3 className="text-2xl font-bold text-purple-400 mt-8">Economy</h3>
          <ul className="list-disc list-inside text-blue-300 space-y-2">
            <li><span className="font-bold text-green-400">Tickets & Earnings:</span> Purchase tickets with tokens, battle for victory, and earn tickets to reinvest or redeem.</li>
            <li><span className="font-bold text-green-400">NFT Cosmetics:</span> Customize your Elementals with exclusive cosmetics, without affecting gameplay.</li>
          </ul>
          
          <h3 className="text-2xl font-bold text-purple-400 mt-8">Meet Our Team</h3>
          <p className="text-blue-300">
            With years of blockchain innovation and game development experience, we're dedicated to crafting an exceptional gaming experience. From stunning visuals to continuous content updates, Elementals is built to evolve and captivate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnModal;