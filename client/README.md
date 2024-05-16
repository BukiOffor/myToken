# SET UP
## Prequisite
First, run the blockchain node, in the core folder by running ```npx hardhat node```. This command will deploy the token on the hardhat network and mint 1,000,000 MT tokens to the deployer.


Then, install the dependencies from the package.json by running:
```bash
npm install
#or
yarn
```
Then, you can run a development server with:

```bash
npm run dev
# or
yarn dev
```
if you do not want to run a development server, you can build the pages inorder to make the rendering faster by running:

```bash
npm run build

#if build was succesfully, you can then run 

npm run start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. if you have something running on port 3000, it switches to port 3001.

Once you connect your wallet, be sure to check that you are on hardhat local network. This is a good tutorial on how to do this [Read Tutorial](https://medium.com/@kaishinaw/connecting-metamask-with-a-local-hardhat-network-7d8cea604dc6)


>NOTE: IT IS IMPORTANT TO IMPORT THE FIRST PRIVATE KEY FROM THE HARDHAT SIGNERS INTO YOUR METAMASK WALLET 👇👇👇 .  ```0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80``` 
 