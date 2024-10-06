import { WalletContext } from "@/context/wallet-context";
import { BrowserProvider, ethers } from "ethers";
import { useContext } from "react";

export const connectWallet = async () => {
    let signer = null;
    let provider: BrowserProvider | null = null;
    
    if (window.ethereum === null || window.ethereum === undefined) {

        console.log("MetaMask not installed")
    }
    else {
        // Connect to the MetaMask EIP-1193 object. This is a standard
        // protocol that allows Ethers access to make all read-only
        // requests through MetaMask.
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.BrowserProvider(window.ethereum)

    }

    return provider;
}

export const getWalletAddress = async () => {
    const provider: BrowserProvider | null = await connectWallet();
  
      if (provider) {
        const account = await provider.getSigner();
        const address = await account.getAddress();

        return address;
      }
      return null;
}