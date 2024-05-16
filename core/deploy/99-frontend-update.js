const { frontEndContractsFile } = require("../helper-hh-config")
const fs = require("fs")
const { network } = require("hardhat")

let UPDATE_FRONT_END = true


module.exports = async () => {
    if (UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        console.log("Front end written!")
    }
}


async function updateContractAddresses() {
    const mtk = await ethers.getContract("MyToken")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    
    contractAddresses[network.config.chainId.toString()] = [mtk.address]
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = []