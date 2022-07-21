import React from 'react'
import { Container } from 'react-bootstrap'
import { PrimaryHeading, ViewMoreBtn } from '../../Globals/Globals'
import ChillumsSlick from './ChillumsSlick'
import {ChillumMainContainer, ChillumSubHeading, ChillumViewMoreBtn } from './StyledChillums'
const Chillum = ({id}) => {
    return (
        <Container id={id}>
        <ChillumMainContainer>
                <PrimaryHeading>CHILLUMS</PrimaryHeading>
                <ChillumSubHeading>Curabitur cursus sagittis varius. Quisque aliquet luctus elit, in hendrerit orci malesuada eu. Morbi feugiat et ligula maximus aliquet. Quisque  aliquet luctus elit, in hendrerit orci malesuada eu. Morbi feugiat et ligula maximus aliquet</ChillumSubHeading>
            <ChillumsSlick/>
        </ChillumMainContainer>
        </Container>
    )
}

export default Chillum





















