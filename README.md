# Ethereum ATM DApp 

This repository contains a decentralized application (DApp) that simulates an Ethereum Automated Teller Machine (ATM) using the Ethereum blockchain and the React JavaScript library. The DApp allows users to connect their MetaMask wallet, authenticate themselves with a PIN, and perform transactions such as depositing and withdrawing Ethereum.

## Getting Started

To run the Ethereum ATM DApp, follow these steps:

### Prerequisites

1. **MetaMask Wallet:** Install the MetaMask browser extension and create an Ethereum wallet. Ensure that MetaMask is connected to the Ethereum Mainnet.

2. **Node.js:** Make sure you have Node.js installed on your machine.


## Usage

1. **Connect Wallet:**
   - Click the "Connect Your MetaMask Wallet" button to connect your MetaMask wallet.
   - Follow the MetaMask prompts to allow access.

2. **Authenticate:**
   - Enter your PIN to authenticate yourself.

3. **View Account Information:**
   - Once authenticated, you can view your account details, including your account address, balance, and additional information.

4. **Deposit:**
   - Click the "Deposit 20 ETH" button to deposit 20 ETH into your account.

5. **Withdraw:**
   - Click the "Withdraw 10 ETH" button to withdraw 10 ETH from your account.

6. **Disconnect Wallet:**
   - Click the "Disconnect Wallet" button to disconnect your MetaMask wallet.

## Security Considerations

- **PIN Authentication:** The DApp uses a simple PIN authentication mechanism. In a production environment, implement a more secure authentication mechanism.

- **MetaMask Connection:** Ensure that users have the MetaMask extension installed and connected to the Ethereum Mainnet for the DApp to function correctly.

## Technologies Used

- **Solidity:** Smart contract language for Ethereum.
- **React:** JavaScript library for building user interfaces.
- **ethers.js:** Ethereum JavaScript library for interacting with Ethereum nodes.
- **MetaMask:** Ethereum wallet extension for browsers.


After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal,  type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/
