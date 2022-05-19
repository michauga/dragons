import { Card } from "react-bootstrap";
import {
    mintNFT
  } from "./util/interact.js";
import { useState } from "react";

export function MintCard(props) {
    const [status, setStatus] = useState("");

    const onMintPressed = async (nftType) => {
        const { success, status } = await mintNFT(nftType);
        setStatus(status);
        if (success) {
          console.log("success");
        }
      };

    return (
        <Card style={{width: "15rem"}}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <button id="mintButton" onClick={() => onMintPressed(props.nftType)}>
          Mint NFT
        </button>
            </Card.Body>
            {/* <p id="status" style={{ color: "red", width: "15rem", alignContent: "end"}}>
          {status}
        </p> */}
        </Card>
    );
}