const { network } = require("hardhat");
const {developmentChains} = require("../helper-hardhat-config")
const {verify} = require("../utils/verify")



module.exports.default = async ({ getNamedAccounts, deployments}) => {
    const{deploy,log} = deployments;
    
    // named account in the hardhat.config.js file
    const{deployer} = await getNamedAccounts();
    

   //deploying the contract
   const args = [1000000, "My Token", "MT"]
    const myToken = await deploy("MyToken",{
        from: deployer,
        args : args,
        log: true,
        waitConfirmations : network.config.blockConifrmations || 1,
    })
  

    log("-------------------------------------------")
    console.log(await myToken.address)

    if(!developmentChains.includes(network.name)){
        await verify(myToken.address,args)
    }
}
module.exports.tags = ["MTK"]