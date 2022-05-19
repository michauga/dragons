import { Container, Row, Col } from "react-bootstrap";
import {MintCard} from "./MintCard.js";

export function MintCardsPanel(props) {


    return (
        <Container>
        <Row>
          <Col><MintCard name="Golden Egg" description="Mysterious item." image="/images/dragonEgg0.png" nftType="0"></MintCard></Col>
          <Col><MintCard name="Red Egg" description="Mysterious item." image="/images/dragonEgg1.png" nftType="1"></MintCard></Col>
          <Col><MintCard name="Green Egg" description="Mysterious item." image="/images/dragonEgg2.png" nftType="2"></MintCard></Col>
        </Row>
      </Container>
    );
}