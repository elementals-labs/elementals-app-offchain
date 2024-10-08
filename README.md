# Elementals - Frontend (React)

Welcome to the **Elementals** frontend repository! This React-based application serves as the user interface for the "Elementals" game, where players can connect their wallets, select their elemental team, and battle against AI enemies.
You may try a playable alpha [here](https://alpha.elementalslab.com/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Gameplay](#gameplay)
  - [Wallet Connection](#wallet-connection)
  - [Selecting a Team](#selecting-a-team)
  - [Battling AI](#battling-ai)
- [Technologies Used](#technologies-used)

## Overview

The **Elementals** frontend is a React-based web application that interacts with the Solana blockchain and the game's smart contracts. Players can:
- Connect their Solana wallets.
- Select a team of elementals.
- Play against AI-controlled enemies.

This frontend handles player interactions, rendering the game interface, and communicating with the backend smart contracts to execute game logic.

## Features

- **Wallet Integration**: Players can connect their Solana wallets using wallet adapters (Phantom, Sollet, etc.).
- **Team Selection**: Players choose from a variety of elemental beings, each with unique stats and abilities.
- **Battle AI**: Players can engage in turn-based combat against AI opponents.

## Gameplay

### Wallet Connection

At the start of the game, players will be prompted to connect their Solana wallet. This integration uses popular wallet adapters like Phantom or Sollet, enabling secure interaction with the Solana blockchain.
Players can:
- Connect their wallets.
- Check their Solana balance.
- Sign transactions directly in the app.

### Selecting a Team

Once the wallet is connected, players can choose their team of elementals. Each player can select 3 elementals from a predefined set, each with unique abilities and stats. The chosen team will be used in battle against AI opponents.

![image](https://github.com/user-attachments/assets/49c9775d-b117-4dcd-86da-ee0005f5262e)


### Battling AI

After selecting a team, the player can engage in battles against AI-controlled enemies. The game follows a turn-based combat system, where players choose actions for their elementals each turn, aiming to defeat the opposing team.

![image](https://github.com/user-attachments/assets/56e91c24-788f-4f49-b9f8-4e7ab26b1f56)


## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Solana Wallet Adapter**: Provides wallet connection functionality for Solana blockchain.
- **Anchor**: Integration with Solana smart contracts to manage game logic.
