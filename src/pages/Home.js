import styled from 'styled-components';
import CubeLogo from '../components/Logo/CubeLogo';
import Visualiser from '../components/Music/Visualiser';
import useWindowSize from '../hooks/useWindowSize';
import React from 'react';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
  canvas {
    animation: rotate 20s linear infinite;
    transform-origin: 50% 50%;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  svg {
    ${(props) => (props.width > props.height ? 'height: 30%' : 'width: 30%')};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    fill: white;
    filter: drop-shadow(0 0 0.5rem ${(props) => props.color});
  }
`;

const Home = ({ song, analyser, frequencyArray, check }) => {
  const widthHeight = useWindowSize();
  const color = ['#11114e', '#f6b2bd', '#72d472', '#f76c6b', '#778899'];
  return (
    <Wrapper width={widthHeight[0]} height={widthHeight[1]} color={color[song]}>
      <CubeLogo />
      <Visualiser
        color={color[song]}
        analyser={analyser}
        frequencyArray={frequencyArray}
        check={check}
      />
    </Wrapper>
  );
};

export default Home;
