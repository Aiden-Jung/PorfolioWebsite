import styled from 'styled-components';
import CubeLogo from '../components/CubeLogo'
import Visualiser from '../components/Visualiser'
import useWindowSize from '../hooks/useWindowSize'
import React from 'react'

    const Section = styled.section`
    height: 100vh;
    width: 100vw;
    position: fixed;
    left:0px;
    top:0px;
    display: flex;
    justify-content: center;
    canvas {
      animation: rotate 20s linear infinite;
      transform-origin: 50% 50%;
    }
    @keyframes rotate{
    100% {
        transform: rotate(360deg);
      }
    }
    svg {
       ${(props)=> (props.width > props.height) ? 'height: 40vh' : 'width: 40vw'};
       position: absolute;
       left: 50%;
       top: 50%;
       fill: white;
       transform: translate(-50%, -50%);
   }
  `;

const Home = ({audio, song, analyser, frequencyArray, check}) => {
  
  const widthHeight = useWindowSize();

  return (<>
  <Section width={widthHeight[0]} height={widthHeight[1]}>
    <CubeLogo/>
    <Visualiser song={song} analyser={analyser} frequencyArray={frequencyArray} check={check}/>
  </Section>
  </>);
};

export default Home;