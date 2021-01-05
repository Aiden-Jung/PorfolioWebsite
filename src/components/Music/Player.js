import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';

const PlayerWrapper = styled.div`
  height: 55px;
  width: 100vw;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  button {
    border: 0;
    outline: 0;
    height: 40%;
    width: 45px;
    margin: 0px 10px;
    background: transparent;
    cursor: pointer;
    transition: 0.3s;
  }
  svg {
    height: 100%;
    width: 100%;
  }
`;
//filter: drop-shadow(0 0 0.3rem ${(props) => props.color});

const Player = ({ playing, list, song, audio, setSong }) => {
  //const color = ['#11114e', '#f6b2bd', '#72d472', '#f76c6b', '#778899'];

  const playpause = () => {
    if (audio.paused && !playing) {
      audio.play();
    }
    if (!audio.paused && playing) {
      audio.pause();
    }
  };

  const forward = () => {
    if (song === list.length - 1) {
      setSong(0);
      audio.src = list[0];
    } else {
      setSong(song + 1);
      audio.src = list[song + 1];
    }
    if (playing) {
      audio.play();
    }
  };

  const backward = () => {
    if (song === 0) {
      setSong(list.length - 1);
      audio.src = list[list.length - 1];
    } else {
      setSong(song - 1);
      audio.src = list[song - 1];
    }
    if (playing) {
      audio.play();
    }
  };

  return (
    <PlayerWrapper>
      <button onClick={backward}>
        <FaBackward color="white" />
      </button>
      <button onClick={playpause}>
        {!playing ? <FaPlay color="white" /> : <FaPause color="white" />}
      </button>
      <button onClick={forward}>
        <FaForward color="white" />
      </button>
    </PlayerWrapper>
  );
};

export default Player;
