const networkConfig = {
    5: {
        name: "goerli",
        supply : "1000000" 
    },
    31337: {
        name: "hardhat",
        supply : "1000000",
    },
    11155111: {
        name: "Sepolia",
        supply : "1000000"
    }
}
const developmentChains = ["hardhat", "localhost"]
const frontEndContractsFile = "../client/constants/contractAddresses.json"

module.exports = {
    developmentChains,
    networkConfig,
    frontEndContractsFile
}