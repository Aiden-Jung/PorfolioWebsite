import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import work from '../../assets/work/index';

const Container = styled.div`
  height: 50vh;
  width: 70vw;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .slick-slider {
    top: 50%;
    transform: translate(0%, -50%);
  }
  .slick-slide {
    margin: 0 1rem;
    div {
      outline: none;
    }
  }
  .slick-list {
    margin: 0 -1rem;
  }
  .slick-track {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    height: 30px;
    width: 30px;
  }
  .slick-prev {
    left: -45px;
    :before {
      font-size: 30px;
    }
  }
  .slick-next {
    right: -45px;
    :before {
      font-size: 30px;
    }
  }
  .progress {
    height: 100%;
    width: 100%;
    text-align: center;
    font-family: 'OpenSans';
    font-size: 2rem;
    color: white;
  }
`;

const ImageContainer = styled.div`
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Container>
        <Slider {...settings}>
          <ImageContainer>
            <a href="https://github.com/Aiden-Jung/PorfolioWebsite">
              <img alt="work1" src={work[0]} />
            </a>
          </ImageContainer>
          <div className="progress">In Progress...</div>
        </Slider>
      </Container>
    </>
  );
};

export default Carousel;
