const {network, ethers} = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hh-config")
const {verify} = require("../utils/verify")


module.exports.default = async({deployments,getNamedAccounts})=>{
    let chainId
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();

    chainId = network.config.chainId
    const initialSupply = networkConfig[chainId].supply || 1000000;

    log('***********Deploying Contract*************************')
    const token = await deploy("MyToken",{
        from: deployer,
        args: [initialSupply, "MY TOKEN", "MT"],
        log: true,
    })
  

    log(`Contract deployed at ${token.address}`)
    if (!developmentChains.includes(network.name)) {
        log("verifying.................")
        await verify(token.address, [initialSupply, "MY TOKEN", "MT"])
    }
    log("-------------------------------------------------------")
 

}