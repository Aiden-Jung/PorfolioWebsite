import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CubeLogo from '../components/Logo/CubeLogo';
import { animated, useTransition } from 'react-spring';
import useWindowSize from '../hooks/useWindowSize';

const Container = styled.div`
  height: 100%;
  width: 100%;
  button {
    font-family: 'OpenSans';
    position: absolute;
    bottom: 25%;
    left: 50%;
    color: white;
    background: transparent;
    border: 0;
    outline: 0;
    font-size: 120%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: 1s;
    animation: fadein 2s forwards;
    :hover {
      opacity: 0.5;
    }
  }
  svg {
    ${(props) => (props.width > props.height ? 'height: 30%' : 'width: 30%')};
    position: absolute;
    left: 50%;
    top: 50%;
    fill: white;
    transform: translate(-50%, -50%);
  }
  path {
    fill: none;
    stroke: #fff;
    animation: typography 5s forwards, fill 2s forwards 5s;
  }

  path:nth-child(1) {
    stroke-dasharray: 1311;
    stroke-dashoffset: -1311;
  }
  path:nth-child(2) {
    stroke-dasharray: 1560;
    stroke-dashoffset: 1560;
  }
  path:nth-child(3) {
    stroke-dasharray: 1370;
    stroke-dashoffset: 1370;
  }

  @keyframes typography {
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes fill {
    from {
      fill: transparent;
    }
    to {
      fill: #fff;
    }
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Loading = ({ loading, setLoading }) => {
  const [end, setEnd] = useState(false);

  const widthHeight = useWindowSize();

  const transitions = useTransition(loading, null, {
    from: { background: 'linear-gradient(#11114e, #add8e6)', opacity: 1 },
    enter: { background: 'linear-gradient(#11114e, #add8e6)', opacity: 1 },
    leave: { backgroud: 'transparent', opacity: 0 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    setTimeout(() => {
      setEnd(true);
    }, 5000);
  }, []);

  const button = end ? (
    <button
      onClick={() => {
        setLoading(false);
      }}
    >
      START THE EXPERIENCE
    </button>
  ) : null;

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100vw',
            height: '100vh',
            zIndex: '100',
            ...props,
          }}
        >
          <Container width={widthHeight[0]} height={widthHeight[1]}>
            <CubeLogo />
            {button}
          </Container>
        </animated.div>
      )
  );
};

export default Loading;
