# CryptoRaffle - Foundry Edition

A decentralized raffle system built with Foundry + Chainlink VRF.

## Smart Contract Features

- Enter raffle with `entranceFee`.
- Chainlink VRF-based random winner selection.
- Time-based automation using upkeep checks.
- Round-aware protections:
  - one entry per address per round,
  - explicit round IDs,
  - richer entry event payloads.

## Project Structure

```text
.
├── src/
│   └── Raffle.sol
├── script/
│   ├── DeployRaffle.s.sol
│   ├── HelperConfig.s.sol
│   └── interactions.s.sol
├── test/
│   ├── uint/RaffleTest.t.sol
│   └── integration/Integration.t.sol
└── frontend/
    ├── index.html
    ├── app.js
    └── styles.css
```

## Getting Started (Contracts)

Prerequisite: [Foundry](https://book.getfoundry.sh/).

```bash
make install
forge build
forge test
```

## Frontend (New)

A lightweight dashboard is included in `frontend/`.

### What it does

- Connects wallet (MetaMask).
- Shows raffle metrics:
  - entrance fee,
  - prize pool,
  - current round,
  - player count,
  - raffle state,
  - recent winner.
- Lets users enter the raffle with the exact entrance fee.
- Shows activity log and whether the connected account already entered this round.

### Run it locally

From repo root:

```bash
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080/frontend/`

Set your deployed raffle contract address in the input and click **Connect Wallet**.
