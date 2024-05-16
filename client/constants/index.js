export const tokenAbi = require("./abi.json")
export const chainAddress = require("./contractAddresses.json")
export const contractAddress = chainAddress["31337"][0]


module.exports = {
    tokenAbi,
    contractAddress
}
