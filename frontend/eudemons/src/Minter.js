import { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import {
  connectWallet,
  getCurrentWalletConnected,
  balanceOf
} from "./util/interact.js";

import { NFTCard } from "./NFTCard.js";
import { MintCardsPanel } from "./MintCardsPanel.js";



const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    if(address){
      const balance = await balanceOf();
      setBalance(balance);
      console.log("balance", balance);
    }

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  return (
    <div>
      <div className="Minter">
        <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>

        <br></br>
        <h1 id="title">🐉 Unique dragon NFT collection</h1>

        <p id="status" style={{ color: "red" }}>
          {status}
        </p>

      </div>

      <MintCardsPanel></MintCardsPanel>
      <h1>Minted NFTs:</h1>
      {balance != 0 ? 
      <Container>
      <Row xs={1} md={3} className="g-4">
      {Array.from({ length: balance }).map((_, idx) => (
        <Col>
        <NFTCard key={idx} idx={idx} />
        </Col>
      ))}
    </Row>
    </Container>
      
       : walletAddress ? <h6>You have 0 NFTs minted!</h6> : <h6>Connect to Metamask to see your NFT's !</h6>}
    </div>
  );
};

export default Minter;