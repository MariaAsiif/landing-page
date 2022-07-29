import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { ViewMoreBtn } from "../../Globals/Globals";
import InhalateSlick from "./InhalateSlick";
import {
  InhalateButtonContainer,
  InhalateMainContainer,
  InhalateTextContainer,
} from "./StyledInhalate";
import VideoModal from '../VideoModal/VideoModal';
import Collapse from 'react-bootstrap/Collapse';
const Inhalate = ({ id }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container id={id}>

      <InhalateMainContainer>
        <InhalateTextContainer>
          <h3 type="button" onClick={() => setOpen(!open)} aria-controls="inhalate-collapse" >Inhalate</h3>
          <Collapse in={open}>
            <p id="inhalate-collapse"  >
              Curabitur cursus sagittis varius. Quisque aliquet luctus elit, in
              hendrerit orci malesuada eu. Morbi feugiat et ligula maximus
              aliquet. Quisque aliquet luctus elit, in hendrerit orci malesuada
              eu. Morbi feugiat et ligula maximus aliquet
            </p>
          </Collapse>



        </InhalateTextContainer>
        <InhalateSlick />
        <InhalateButtonContainer>
          <ViewMoreBtn  >View More</ViewMoreBtn>
        </InhalateButtonContainer>
      </InhalateMainContainer>
    </Container>
  );
};

export default Inhalate;
