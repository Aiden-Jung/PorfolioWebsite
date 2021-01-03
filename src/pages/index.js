import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Project from './Project';
import About from './About';
import Header from '../components/Header/Header';
import { useSpring, useTransition, animated } from 'react-spring';

const Pages = ({ audio, song, analyser, frequencyArray, check }) => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { o: 0 },
    enter: { o: 1 },
    leave: { o: 2 },
    config: { duration: 1000 },
  });

  return (
    <>
      <Header />
      {transitions.map(({ item: location, props, key }) => (
        <animated.div
          key={key}
          style={{
            opacity: props.o.interpolate([0, 0.5, 1, 1.5, 2], [0, 0, 1, 0, 0]),
          }}
        >
          <Switch location={location}>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  audio={audio}
                  song={song}
                  analyser={analyser}
                  frequencyArray={frequencyArray}
                  check={check}
                />
              )}
            />
            <Route path="/project" component={Project} />
            <Route path="/about" component={About} />
          </Switch>
        </animated.div>
      ))}
    </>
  );
};

export default Pages;
