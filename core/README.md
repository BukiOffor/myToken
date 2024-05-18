## SET UP
Run the following command in the core directory

```bash
npm install
#to deploy on hardhat local chain, add the --network <networkname> to deploy on a livenet
npx hardhat deploy
# this command will deploy a local blockchain node and deliver 20 prefunded accounts
npx hardhat node
```

### security

The security of the contract is tight in the sense that it does not give an attacker room for manipulaton. The contract will cease and revert once the allowance mapping of contract caller and contract address is less than the amount trying to access.