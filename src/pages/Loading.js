import React from 'react';
import styled from 'styled-components';
import CubeLogo from '../components/CubeLogo'

 const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(#11114e, #add8e6);
  button{
    font-family: 'OpenSans';
    position: absolute;
    bottom: 15%;
    left: 50%;
    color: white;
    background: transparent;
    border: 0;
    outline: 0;
    font-size: 120%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: 1s;
    :hover{
      opacity: 0.5;
    }
  }
  svg{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40%;
    height: 40%;
    transform: translate(-50%, -50%);
  }
  path{
    fill: none;
    stroke: #fff;
    animation: typography 5s forwards, fill 2s forwards 5s;
  }

  path:nth-child(1){
    stroke-dasharray: 1311;
    stroke-dashoffset: -1311;
  }
  path:nth-child(2){
    stroke-dasharray: 1560;
    stroke-dashoffset: 1560;
  }
  path:nth-child(3){
    stroke-dasharray: 1370;
    stroke-dashoffset: 1370;
  }

  @keyframes typography{
    to {
      stroke-dashoffset: 0;
      }
    }
  @keyframes fill{
      from {
        fill: transparent;
      }
      to {
        fill: #fff;
        }
    }
  `;

const Loading = ({setLoading}) => {

  return (<>
  <Container>
  <CubeLogo/>
  <button onClick={()=>setLoading(false)}>START THE EXPERIENCE</button>
  </Container>
  </>);
};

export default Loading;