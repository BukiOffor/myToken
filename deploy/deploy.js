const { network } = require("hardhat");
const {developmentChains} = require("../helper-hardhat-config")
const {verify} = require("../utils/verify")



module.exports.default = async ({ getNamedAccounts, deployments}) => {
    const{deploy,log} = deployments;
    // Since you asked for getNamedAccounts I assume you are developing on a hardhat environment 
    //because it is used to retrieve accounts manually from the attribute namedAccounts defined whithin hardhat.config.js 
    //and it is an exclusive feature with the plugin hardhat-deploy.
    const{deployer} = await getNamedAccounts();
    //const chainId = network.config.chainId;
    

   //deploying the contract
   const args = [1000000, "My Token", "MT"]
    const myToken = await deploy("MyToken",{
        from: deployer,
        args : args,
        log: true,
        waitConfirmations : network.config.blockConifrmations || 1,
    })
    // if(!developmentChains.includes(network.name)){
    //     await verify(ManualToken.address,[10e18, 'ManualToken', "MTK"])
    // }
    log("-------------------------------------------")
    console.log(await myToken.address)

    if(!developmentChains.includes(network.name)){
        await verify(myToken.address,args)
    }
}
module.exports.tags = ["MTK"]