require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
//require("hardhat-gas-reporter");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */


const sepolia_pk = process.env.sepolia_pk || "0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61"
const sepolia_rpc = process.env.sepolia_rpc_url || "https://your url here"

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            }
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            gasLimit: 3e10, // whatever you want here
            allowUnlimitedContractSize: true
        },
        sepolia :{
            url: sepolia_rpc,
            accounts: [sepolia_pk],
            chainId: 11155111,
            blockConfirmations : 6
          },
    },
   
    namedAccounts: {
        deployer: {
            default: 0,
        },
        signer: {
            default: 1,
        },
        buyer: {
            default: 2,
        },
    },
}

