import {
    getTokenURI,
    hatchEgg,
    tokenOfOwnerByIndex
} from "./util/interact.js";

import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
const axios = require('axios');

export function NFTCard(props) {
    const [imageUrl, setImageUrl] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState(0);
    const [tokenId, setTokenId] = useState(0);

    useEffect(async () => {
        const tokenId = await tokenOfOwnerByIndex(props.idx)
        setTokenId(tokenId);
        const tokenURI = await getTokenURI(tokenId);
        const { success, name, description, image, attributes } = await getNFTMetadata(tokenURI);
        setName(name);
        setDescription(description)
        setImageUrl(image);
        setLevel(attributes[0].value)

    }, []);

    const getNFTMetadata = async (tokenURI) => {
        return axios
            .get(tokenURI)
            .then(function (response) {
                console.log("response: ", response)
                return {
                    success: true,
                    name: response.data.name,
                    description: response.data.description,
                    image: response.data.image,
                    attributes: response.data.attributes
                };
            })
            .catch(function (error) {
                console.log(error)
                return {
                    success: false,
                    message: error.message,
                }
            });
    }

    const hatch = async (tokenId) => {
        await hatchEgg(tokenId);
    }

    return (
        <Card style={{width: "20rem"}}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                {level == 1 ? <button onClick={(e) => hatch(tokenId)}>
                    Hatch
                </button> : <></>}
            </Card.Body>
        </Card>
    );
}