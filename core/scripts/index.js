const { ethers } = require("hardhat");



async function main() {
  await transfer("0xf3A38e0673271e479B672643E2470c8bc1A394b8",'100')
}




async function transfer(address,amount) {

  let provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const deployer = new ethers.Wallet(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      provider
  ) 
  const tx = {
    to: address,
    value: ethers.utils.parseEther(amount),
  };
  const receipt = await deployer.sendTransaction(tx);
  console.log(receipt)
  }




async function debug() {

    let provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const deployer = new ethers.Wallet(
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        provider
    ) 
    const token = await ethers.getContractAt(
        "MyToken",
        "0x4b450a6488F36474BE7c9846dEc1083E832b091f", // fetch current address of the contract
        deployer
    )
    const result = await token.getAllowanceOfUser(deployer.address,"0xf3A38e0673271e479B672643E2470c8bc1A394b8")
    const balance = await token.balanceOf(deployer.address)
    console.log(result.toString())
    console.log(balance.toString())

    }

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })