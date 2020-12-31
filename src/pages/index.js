import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import Work from './Work';
import About from './About';
import Particle from '../components/Particle';
import Header from '../components/Header'
import {useSpring, useTransition, animated} from 'react-spring'

let frequencyArray = [];
let analyser;
let source;

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
  img {
                height: 40vh;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
  }
`;

const Pages = ({audio, song}) => {
   const [check, setCheck] = useState(false);

  useEffect(() => {
    initAudio();
    setCheck(true);
    return () => {
    analyser.disconnect();
    source.disconnect();
    }
  }, []);

  const initAudio = () => {
    audio.crossOrigin = "anonymous";
    audio.load();

    const context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();
    source = context.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(context.destination);

    frequencyArray = new Uint8Array(analyser.frequencyBinCount);
  };

  const color = ['linear-gradient(#11114e, #add8e6)',
  'linear-gradient(#ffb6c1, #add8e6)',
  'linear-gradient(#72d472, #add8e6)',
  'linear-gradient(#f08080, #add8e6)',
  'linear-gradient(#778899, #add8e6)']
  
const props = useSpring({
  to: {background: color[song]},
  config: {duration: 1000}})

  const location = useLocation()
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0},
    config: {duration: 1000}})

  return (
    <>
    <Header/>
    <animated.div style={{position: 'fixed',
  top: '0px',
  left: '0px',
  width: '100vw',
  height: '100vh',
  zIndex: '-500', ...props}}/>
    <Particle song={song} analyser={analyser} frequencyArray={frequencyArray}/>
    {transitions.map(({ item: location, props, key }) => (
      <animated.div key={key} style={props}>
      <Switch location={location}>
      <Route exact path='/'
      render={()=> <Home audio={audio} song={song} analyser={analyser} frequencyArray={frequencyArray} check={check}/>}/>
      <Route path='/work' component={Work} />
      <Route path='/about' component={About} />
    </Switch>
    </animated.div>
    ))
    }
    </>
  );
};

export default Pages;