import React from 'react';
import styled from 'styled-components';
import { CgMail } from 'react-icons/cg';
import { FaGithub } from 'react-icons/fa';

const TextWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'OpenSans';
  background: transparent;
  font-size: 1.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 80%;
  * {
    margin: 0;
  }

  @media screen and (max-width: 650px), (max-height: 750px) {
    font-size: 1rem;
  }

  div {
    height: 10%;
  }
  .link {
    display: flex;
    justify-content: center;
    width: 50%;
    a {
      display: flex;
      align-items: center;
    }
    svg {
      color: white;
      width: 2rem;
      height: 2rem;
      margin: 0rem 1rem;
      transition: 1s;
      :hover {
        opacity: 0.5;
      }
    }
  }
`;

const About = () => {
  const text = [
    "I'm Aiden Hyunseok Jung.",
    'I am a CS student in Grinnell College.',
    'I love coding and',
    'want to use my knowledge and skills',
    'to help other people.',
    'Give me a chance to show my ability!',
  ];

  const contents = text.map((v, i) => {
    return <div key={i.toString()}>{v}</div>;
  });

  return (
    <TextWrapper>
      {contents}
      <div className="link">
        <a href="mailto:junghyun@grinnell.edu">
          <CgMail />
        </a>
        <a href="https://github.com/Aiden-Jung">
          <FaGithub />
        </a>
      </div>
    </TextWrapper>
  );
};

export default About;
