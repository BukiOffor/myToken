# myToken

This project is an implementation of an ERC-20 token using Solidity. The ERC-20 standard defines a common set of rules for Ethereum tokens, enabling seamless interaction with decentralized applications (DApps) and other smart contracts on the Ethereum blockchain.

## Table of Contents
- [myToken](#mytoken)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Compile Contracts](#compile-contracts)
    - [Migrate Contracts](#migrate-contracts)
    - [Interact with Contracts](#interact-with-contracts)
  - [Smart Contract Details](#smart-contract-details)
  - [Deployment](#deployment)
  - [License](#license)

## Introduction

MyERC20Token is a standard ERC-20 token with additional features. It is written from scratch in Solidity and adheres to the ERC-20 token standard. This token can be used for various applications including DApps, ICOs, and more.

## Features

- Standard ERC-20 token functionality
- Minting and burning of tokens
- Pausable contract functionality
- Ownership transfer
- allowance 

## Getting Started

These instructions will help you set up the project locally for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v12.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher) or [yarn](https://yarnpkg.com/)
- [Hardhat](https://www.hardhat.com/) (for local blockchain testing)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/bukiOffor/myToken.git
   cd myToken
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn
   ```

## Usage

### Compile Contracts

To compile the smart contracts, run:

```sh
npx hardhat compile
```

### Migrate Contracts

To deploy the smart contracts to a local blockchain (using Ganache), run:

```sh
npx hardhat deploy
```

### Interact with Contracts

You can interact with the deployed contracts using Truffle console:

```sh
npx hardhat console
```

Within the console, you can call the contract functions. For example:

```js
let token = await MyERC20Token.deployed();
await token.name();
await token.symbol();
await token.totalSupply();
```

## Smart Contract Details

The main contract is `MyERC20Token.sol`, which implements the ERC-20 standard and includes the following functionalities:

- **name**: Returns the name of the token.
- **symbol**: Returns the symbol of the token.
- **decimals**: Returns the number of decimals the token uses.
- **totalSupply**: Returns the total token supply.
- **balanceOf**: Returns the account balance of another account with address `owner`.
- **transfer**: Transfers `value` amount of tokens to address `to`.
- **approveAndCall**: Allows `spender` to withdraw from your account multiple times, up to the `value` amount.
- **transferFrom**: Transfers `value` amount of tokens from address `from` to address `to`.



## Deployment

To deploy the contracts to a public network, you need to set up the configuration in `hardhat-config.js` and specify the appropriate network settings and credentials.

For example, to deploy to the sepolia test network, ensure you have a valid Infura project ID and a mnemonic phrase. Then, update the `hardhat-config.js` as follows:

```js
sepolia: {
      url: "<your rpc url goes here>",
      accounts: ["<private key goes here>"],
      chainId: 11155111,
      blockConfirmations : 6,
      gasPrice: 5000000
    },
```

Finally, run:

```sh
npx hardhat deploy --network sepolia
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
