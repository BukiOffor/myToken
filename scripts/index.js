// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
import { Network, Alchemy } from "alchemy-sdk";


// Optional config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "TteWeVe5kzZq6A2fMXAD-THGjx-Wa94i", // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};
const alchemy = new Alchemy(settings);

// Get logs for a certain address, with specified topics and blockHash
alchemy.core
  .getLogs({
    address: "0x873289a1aD6Cf024B927bd13bd183B264d274c68",
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    ],
    blockHash:
      "0x49664d1de6b3915d7e6fa297ff4b3d1c5328b8ecf2ff0eefb912a4dc5f6ad4a0",
  })
  .then(console.log);

