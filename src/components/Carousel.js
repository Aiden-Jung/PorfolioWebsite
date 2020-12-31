import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {work1, work2, work3, work4} from '../assets/work/index'

const Container = styled.div`
    height: 50vh;
    width: 80vw;
    position: fixed;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    .slick-slider{
        top: 50%;
        transform: translate(0%, -50%);
    }
    .slick-slide {
    margin: 0 1rem;
    div{
        outline: none;
    }
    }
    .slick-list {
        margin: 0 -1rem;
    }
    .slick-track{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const ImageContainer = styled.div` 

    img{
    max-width:100%;
    max-height:100%;
}
`;

const Carousel = () => {
    
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (<>
    <Container>
        <Slider {...settings}>
        <ImageContainer>
            <img src={work1} />
          </ImageContainer>
          <ImageContainer>
            <img src={work2} />
          </ImageContainer>
          <ImageContainer>
            <img src={work3} />
          </ImageContainer>
          <ImageContainer>
            <img src={work4} />
          </ImageContainer>
        </Slider>
      </Container>
  </>);
};

export default Carousel;