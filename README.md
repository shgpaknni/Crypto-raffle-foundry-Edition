# CryptoRaffle - Foundry Edition

**CryptoRaffle** is a smart contract system built on the Ethereum blockchain, designed for decentralized raffles and lotteries. The contract allows users to participate in raffles by contributing ETH, and it integrates with Chainlink's VRF for randomness and automation services.

# Decentralized CryptoRaffle System with Chainlink VRF

## Overview

This project is a decentralized raffle  built on Ethereum, utilizing Chainlink's Verifiable Random Function (VRF) to ensure fair and transparent winner selection. Participants enter the raffle by paying an entrance fee, and a winner is randomly chosen using Chainlink VRF, which provides cryptographically secure randomness.

## Key Components

### CryptoRaffle

- **Entry Mechanism**: Users can enter the raffle by paying a set `entranceFee`.
- **Random Winner Selection**: Chainlink VRF generates a provably random number to select the raffle winner.
- **Time-based Execution**: A configurable `interval` ensures that raffles are drawn only after a specified period.
- **Upkeep**: Chainlink Keepers automate winner selection based on predefined conditions.

### Chainlink VRF Integration

- Chainlink VRF ensures randomness in winner selection, with requests handled through a subscription model. The contract uses a subscription ID funded with LINK tokens to pay for VRF requests.

### Helper Contracts and Mock Implementations

- **HelperConfig**: Retrieves network-specific configurations such as VRF Coordinator address, subscription ID, and entrance fees.
- **Mock Contracts**: Simulate Chainlink VRF and LINK token behavior during local testing with Anvil.

### Testing and Deployment

- **Testing**: Comprehensive unit tests are written using Foundry, covering various scenarios including edge cases, randomness verification, and contract state changes.
- **Deployment Scripts**: Automated scripts for deploying the raffle contract to both local and public networks, including the setup of VRF subscriptions and funding.

### LINK Token Management

- A custom ERC20-compatible `LinkToken` contract is used to manage LINK transfers and simulate token behavior during local tests.

### Events and Logs

- Key events like raffle entries and winner selections are logged for transparency.

## Installation and Setup

### Prerequisites

- Ensure you have [Foundry](https://book.getfoundry.sh/) installed.

### Install Dependencies

```bash
make install

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
