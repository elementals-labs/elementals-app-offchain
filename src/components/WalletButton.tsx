import React, { useState, useEffect } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { Connection, clusterApiUrl } from '@solana/web3.js';

interface WalletButtonProps {
  onAddressChange: (address: string | null) => void;
}

const WalletButton: React.FC<WalletButtonProps> = ({ onAddressChange }) => {
  const [wallet, setWallet] = useState<PhantomWalletAdapter | null>(null);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const connection = new Connection(clusterApiUrl('devnet'));
    const phantomWallet = new PhantomWalletAdapter();
    setWallet(phantomWallet);

    // Check if wallet is already connected
    if (phantomWallet.connected) {
      setConnected(true);
      const walletAddress = phantomWallet.publicKey?.toBase58() || null;
      setAddress(walletAddress);
      onAddressChange(walletAddress);
    }

    // Listen for connection events
    phantomWallet.on('connect', () => {
      setConnected(true);
      const walletAddress = phantomWallet.publicKey?.toBase58() || null;
      setAddress(walletAddress);
      onAddressChange(walletAddress);
    });

    phantomWallet.on('disconnect', () => {
      setConnected(false);
      setAddress(null);
      onAddressChange(null);
    });

    return () => {
      phantomWallet.disconnect();
    };
  }, [onAddressChange]);

  const connectWallet = async () => {
    if (wallet && !connected) {
      try {
        await wallet.connect();
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  const disconnectWallet = async () => {
    if (wallet && connected) {
      await wallet.disconnect();
    }
  };

  return (
    <button
      onClick={connected ? disconnectWallet : connectWallet}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 transition-colors"
    >
      {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
    </button>
  );
};

export default WalletButton;