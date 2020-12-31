import React from 'react';
import styled from 'styled-components';
import {FaPlay, FaPause, FaBackward, FaForward} from 'react-icons/fa';

const PlayerWrapper = styled.div`
  height: 7vh;
  width: 100vw;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  button{
    opacity: 0.8;
    border: 0;
    outline: 0;
    height: 100%;
    width: 10%;
    background: transparent;
    padding: 0rem;
    cursor: pointer;
    transition: 0.5s;
  }
  button:hover {
    opacity: 0.5;
}
svg{
    height: 40%;
    width: 40%;
}
`;

const Player = ({playing, list, song, audio, setSong, setPlaying}) => {

  const playpause = () => {
      if(!playing){
          audio.play();
      }else{
              audio.pause();
      }
      setPlaying(!playing);
  }



  const forward = () => {
      if(song === list.length - 1){
          setSong(0);
          audio.src = list[0];
      } else{
          setSong(song+1);
          audio.src = list[song+1];
      }
      if(playing){
          audio.play();
      }
  }

  const backward = () => {
      if(song === 0){
          setSong(list.length - 1);
          audio.src = list[list.length-1];
      } else{
          setSong(song-1);
          audio.src = list[song-1];
      }
      if(playing){
          audio.play();
      }
  }

  return <>
  
<PlayerWrapper>
  <button onClick={backward}><FaBackward color="white"/></button>
  <button onClick={playpause}>{!playing ? <FaPlay color="white"/> : <FaPause color='white'/>}</button>
  <button onClick={forward}><FaForward color="white"/></button>
  </PlayerWrapper>
  </>


}

export default Player;