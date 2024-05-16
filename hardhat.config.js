//require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan")


const api_key = "YGHYNPB1XMTJM9Y1CN98UFE73FXS7T61TK"

module.exports = {
  //solidity: "0.8.8",
  solidity : {
    compilers: [
      {version : "0.8.7"},
      {version : "0.6.6"},
    ]
  },
  defaultNetwork: "hardhat",
  networks : {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/JUd33W6MxjKFCz0rLRrFrsCTpdsXLPZk",
      accounts: ["dca53f92ea49c2a28c46b97c1e5c75439d2a2864ce31fcdeae94a4515ad71192"],
      chainId: 5,
      blockConfirmations : 6
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/BO6COcusSbwBNDRbtrQpfxl1nqpe_CRt",
      accounts: ["b72cb42b3319abb30fc17f7e20ea58165a84de90c9afd90fcb80382062e01382"],
      chainId: 11155111,
      blockConfirmations : 6,
      gasPrice: 5000000
    },
    
  },
  gasReporter : {
    enabled: true,
    outputFile : "gas_report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap : "f153a2fe-0002-4a02-8d67-dcc1d26ee11d",
  },
  etherscan : {
    apiKey : api_key,
  },
  namedAccounts : {
    deployer : {
        default:0
    }
  }
};