import React from 'react';
import playBtnImg from '../../assets/play-btn.svg'
import { PlayBtnContainer, PlayBtnImg } from './Globals';
const PlayBtn = ({clicked}) => {
  return (
      <PlayBtnContainer>
           <button onClick={clicked} className='btn'><PlayBtnImg src={playBtnImg}/></button>
      </PlayBtnContainer>
    
  )
}

export default PlayBtn