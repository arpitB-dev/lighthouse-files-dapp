import { notify } from "./notification";
// import Web3 from "web3";


const networks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  fantom: {
    chainId: `0x${Number(250).toString(16)}`,
    chainName: "Fantom Opera",
    nativeCurrency: {
      name: "Fantom Chain Native Token",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ftm.tools/"],
    blockExplorerUrls: ["https://ftmscan.com/"],
  },
  optimism: {
    chainId: `0x${Number(10).toString(16)}`,
    chainName: "Optimistic Ethereum",
    nativeCurrency: {
      name: "Optimistic Chain Native Token",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorerUrls: ["https://optimistic.ethereum.io"],
  },
  binance: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Native Chain Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  ethereum: {
    chainId: `0x${Number(1).toString(16)}`,
  },
};

export async function getChainNetwork() {
  let network = "fantom-testnet";
  let networkVersion = await window.ethereum.request({ method: "net_version" });
  if (window.ethereum.isConnected()) {
    switch (networkVersion) {
      case "137":
        network = "polygon";
        break;
      case "250":
        network = "fantom";
        break;
      case "56":
        network = "binance";
        break;
      case "10":
        network = "optimism";
        break;
      case "1":
        network = "ethereum";
        break;
      case "4002":
        network = "fantom-testnet";
        break;
      case "80001":
        network = "polygon-testnet";
        break;
      case "97":
        network = "binance-testnet";
        break;
      case "69":
        network = "optimism-testnet";
        break;
      default:
        network = null;
        notify("Please connect to supported Chain", "error");
        break;
    }
  } else {
  }
  return network;
}

export const changeNetwork = async ({ networkName }) => {
  console.log(networks[networkName]);
  let method =
    networkName === "ethereum"
      ? "wallet_switchEthereumChain"
      : "wallet_addEthereumChain";
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: method,
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    notify(err, "error");
  }
};


