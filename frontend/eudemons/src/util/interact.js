require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contract = require('../contracts/Dragon.sol/Dragon.json');
const contractABI = contract.abi;
const contractAddress = "0xFeEc4F0C3fc8923988f34A840c7DAD966c530CD2";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Try to mint some NFTs below 👇",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};


export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Try to mint some NFTs below 👇",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in yourbrowser.
            </a>
          </p>
        </span>
      ),
    };
  }
};


export const mintNFT = async (nftType) => {

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  const mintFee = "0x38D7EA4C68000"
  const transactionParameters = {
    to: contractAddress,
    from: window.ethereum.selectedAddress,
    'data': window.contract.methods.mintDragonEgg(window.ethereum.selectedAddress, nftType).encodeABI(),
    value: mintFee
  };

  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    return {
      success: true,
      status: "✅ Minting process started. Check out your transaction status on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message
    }
  }
}


export const getTokenURI = async (tokenId) => {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const tokenURI = await contract.methods.getTokenURI(tokenId).call();
  return tokenURI;
}


export const balanceOf = async () => {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const balance = await contract.methods.balanceOf(window.ethereum.selectedAddress).call();
  return balance;
}

export const tokenOfOwnerByIndex = async (idx) => {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const tokenId = await contract.methods.tokenOfOwnerByIndex(window.ethereum.selectedAddress, idx).call();
  return tokenId;
}

export const hatchEgg = async (tokenId) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const evolveFee = "0x1C6BF52634000"
  const transactionParameters = {
    to: contractAddress,
    from: window.ethereum.selectedAddress,
    'data': window.contract.methods.hatchDragonEgg(tokenId).encodeABI(),
    value: evolveFee
  };

  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    return {
      success: true,
      status: "✅ Check out your (hatching) transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong during hatching: " + error.message
    }
  }
}
