const ABI = [
  "function enterRaffle() external payable",
  "function getEntranceFee() external view returns (uint256)",
  "function getRaffleState() external view returns (uint8)",
  "function getLastTimeStamp() external view returns (uint256)",
  "function getRecentWinner() external view returns (address)",
  "function getRoundId() external view returns (uint256)",
  "function getNumberOfPlayers() external view returns (uint256)",
  "function getPrizePool() external view returns (uint256)",
  "function hasEnteredCurrentRound(address player) external view returns (bool)",
  "event RaffleEntered(address indexed player, uint256 indexed roundId, uint256 amount)",
  "event WinnerPicked(address indexed winner)"
];

const el = {
  contractAddress: document.getElementById("contractAddress"),
  connectBtn: document.getElementById("connectBtn"),
  refreshBtn: document.getElementById("refreshBtn"),
  enterBtn: document.getElementById("enterBtn"),
  wallet: document.getElementById("wallet"),
  network: document.getElementById("network"),
  entranceFee: document.getElementById("entranceFee"),
  prizePool: document.getElementById("prizePool"),
  roundId: document.getElementById("roundId"),
  players: document.getElementById("players"),
  state: document.getElementById("state"),
  winner: document.getElementById("winner"),
  log: document.getElementById("log")
};

const DEFAULT = "0x0000000000000000000000000000000000000000";
el.contractAddress.value = localStorage.getItem("raffleAddress") || DEFAULT;

let provider;
let signer;
let raffle;

function out(msg) {
  el.log.textContent = `[${new Date().toLocaleTimeString()}] ${msg}\n${el.log.textContent}`;
}

function short(addr) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function stateName(state) {
  return Number(state) === 0 ? "OPEN" : "CALCULATING";
}

async function ensureSetup() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const address = el.contractAddress.value.trim();
  if (!ethers.isAddress(address) || address === DEFAULT) {
    throw new Error("Provide a valid deployed raffle address");
  }
  localStorage.setItem("raffleAddress", address);
  raffle = new ethers.Contract(address, ABI, signer);
  return { address };
}

async function connect() {
  try {
    await ensureSetup();
    const net = await provider.getNetwork();
    const addr = await signer.getAddress();
    el.wallet.textContent = `Wallet: ${short(addr)}`;
    el.network.textContent = `Network: chainId ${net.chainId}`;
    out("Wallet connected.");
    await refresh();
  } catch (err) {
    out(`Connect error: ${err.message}`);
  }
}

async function refresh() {
  try {
    if (!raffle) await ensureSetup();
    const [entranceFee, prizePool, roundId, players, state, winner] = await Promise.all([
      raffle.getEntranceFee(),
      raffle.getPrizePool(),
      raffle.getRoundId(),
      raffle.getNumberOfPlayers(),
      raffle.getRaffleState(),
      raffle.getRecentWinner()
    ]);

    el.entranceFee.textContent = `${ethers.formatEther(entranceFee)} ETH`;
    el.prizePool.textContent = `${ethers.formatEther(prizePool)} ETH`;
    el.roundId.textContent = roundId.toString();
    el.players.textContent = players.toString();
    el.state.textContent = stateName(state);
    el.winner.textContent = winner === DEFAULT ? "No winner yet" : short(winner);

    const me = await signer.getAddress();
    const entered = await raffle.hasEnteredCurrentRound(me);
    out(`Loaded data. You ${entered ? "already entered" : "can enter"} this round.`);
  } catch (err) {
    out(`Refresh error: ${err.message}`);
  }
}

async function enter() {
  try {
    if (!raffle) await ensureSetup();
    const fee = await raffle.getEntranceFee();
    out(`Submitting entry tx with ${ethers.formatEther(fee)} ETH...`);
    const tx = await raffle.enterRaffle({ value: fee });
    out(`Tx sent: ${tx.hash}`);
    await tx.wait();
    out("Entry confirmed ✅");
    await refresh();
  } catch (err) {
    out(`Entry error: ${err.message}`);
  }
}

el.connectBtn.addEventListener("click", connect);
el.refreshBtn.addEventListener("click", refresh);
el.enterBtn.addEventListener("click", enter);
