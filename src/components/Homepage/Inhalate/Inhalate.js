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
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

const Inhalate = ({ id }) => {
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => { });
    return (
      <h3 type="button" onClick={decoratedOnClick}>
        {children}
      </h3>
    );
  }
  return (
    <Container id={id}>
      <InhalateMainContainer>
        <InhalateTextContainer>
          <Accordion defaultActiveKey="0">
            <CustomToggle eventKey="0">Inhalate</CustomToggle>
            <Accordion.Collapse eventKey="0">
              <p>
                Curabitur cursus sagittis varius. Quisque aliquet luctus elit, in
                hendrerit orci malesuada eu. Morbi feugiat et ligula maximus
                aliquet. Quisque aliquet luctus elit, in hendrerit orci malesuada
                eu. Morbi feugiat et ligula maximus aliquet
              </p>
            </Accordion.Collapse>
          </Accordion>

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
