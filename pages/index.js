import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [disconnectMessage, setDisconnectMessage] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      const currentAccount = accounts[0];
      console.log("Account connected: ", currentAccount);
      setAccount(currentAccount);
    } else {
      console.log("No account found");
      setAccount(undefined);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Reset disconnect message
    setDisconnectMessage("");

    // Once the wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      try {
        const amount = 20;
        let tx = await atm.deposit(amount);
        await tx.wait();
        getBalance();
        setTransactionSuccess(true);
        setTransactionMessage(`Deposit of ${amount} ETH successful!`);
      } catch (error) {
        console.error("Deposit failed:", error);
        setTransactionMessage("Deposit failed. Please try again.");
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      try {
        const amount = 10;
        let tx = await atm.withdraw(amount);
        await tx.wait();
        getBalance();
        setTransactionSuccess(true);
        setTransactionMessage(`Withdrawal of ${amount} ETH successful!`);
      } catch (error) {
        console.error("Withdrawal failed:", error);
        setTransactionMessage("Withdrawal failed. Please try again.");
      }
    }
  };

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const authenticateUser = () => {
    // Simple PIN authentication, replace with a secure authentication mechanism
    if (pin === "6242") {
      setIsAuthenticated(true);
      getBalance();
    } else {
      alert("Incorrect PIN. Please try again.");
    }
  };

  const disconnectWallet = () => {
    // Disconnect the MetaMask wallet
    if (ethWallet) {
      setEthWallet(undefined);
      setAccount(undefined);
      setATM(undefined);
      setBalance(undefined);
      setIsAuthenticated(false);
      setTransactionSuccess(false);
      setDisconnectMessage("Wallet disconnected. Please reconnect to use the ATM.");
    }
  };

  const initUser = () => {
    // Check to see if the user has Metamask
    if (!ethWallet) {
      return null;
    }

    // Check to see if the user is connected. If not, connect to their account
    if (!account) {
      return (
        <div>
          <button onClick={connectAccount}>Connect Your Metamask Wallet</button>
          <p>For a personalized experience, connect your wallet to get started!</p>
        </div>
      );
    }

    // Check if the user is authenticated
    if (!isAuthenticated) {
      return (
        <div>
          <p>Enter PIN to authenticate:</p>
          <input type="password" value={pin} onChange={handlePinChange} />
          <button onClick={authenticateUser}>Authenticate</button>
        </div>
      );
    }

    return (
      <div>
        <p>Account Holder: Syed owaiz</p>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>Designation: Web Developer</p>
        <p>Experience: 2 years</p>
        <button onClick={deposit}>Deposit 20 ETH</button>
        <button onClick={withdraw}>Withdraw 10 ETH</button>
        <button onClick={disconnectWallet}>Disconnect Wallet</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (transactionSuccess) {
      // Display success message on the localhost console
      console.log("Transaction successful!");
      // Reset transaction success state
      setTransactionSuccess(false);
    }
  }, [transactionSuccess]);

  return (
    <main className="container">
      <header>
        <h1 className="heading">Heyy Syed!</h1>
      </header>
      {disconnectMessage && <p>{disconnectMessage}</p>}
      {initUser()}
      {transactionMessage && <p>{transactionMessage}</p>}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #f0f0f0; /* Cool background color */
          padding: 20px;
        }

        .heading {
          color: #0070f3; 
        }
      `}</style>
    </main>
  );
}
