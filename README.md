# CryptoRaffle - Foundry Edition

**CryptoRaffle** is a smart contract system built on the Ethereum blockchain, designed for decentralized raffles and lotteries. The contract allows users to participate in raffles by contributing ETH, and it integrates with Chainlink's VRF for randomness and automation services.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Usage](#usage)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

## Overview

The **CryptoRaffle** contract facilitates decentralized raffle events by enabling users to enter raffles with ETH contributions. The contract owner can manage the raffle, and Chainlink's VRF (Verifiable Random Function) ensures fair randomness in selecting raffle winners.

### Key Components

- **Raffle.sol**: Manages the raffle logic, including entries and winner selection.
- **HelperConfig.s.sol**: Manages network-specific configurations for Chainlink VRF.
- **DeployRaffle.s.sol**: Script for deploying the Raffle contract.
- **MockV3Aggregator.sol**: Simulates price feeds for local testing.

## Features

- **Decentralized Raffles**: Allows multiple users to participate in raffles with ETH.
- **Chainlink VRF Integration**: Ensures fair and verifiable randomness in selecting winners.
- **Automated Upkeep**: Automates raffle management using Chainlink Automation.
- **Gas-Optimized Functions**: Includes optimized functions for cost efficiency.
- **Fallback and Receive Functions**: Handles direct ETH transfers to the contract.

## Project Structure

```plaintext
├── src
│   ├── Raffle.sol                 # Main contract for raffle management
├── script
│   ├── DeployRaffle.s.sol         # Script for deploying the Raffle contract
│   ├── Interactions.s.sol         # Script for interacting with the contract (entering raffle, etc.)
│   ├── HelperConfig.s.sol         # Configuration script for Chainlink VRF
├── test
│   ├── RaffleTest.t.sol           # Unit tests for the Raffle contract
│   ├── IntegrationTest.t.sol      # Integration tests for Raffle
│   ├── mocks
│       └── MockV3Aggregator.sol   # Mock price feed contract for testing
└── .env                           # Environment variables (e.g., RPC URL, private key, API key)
