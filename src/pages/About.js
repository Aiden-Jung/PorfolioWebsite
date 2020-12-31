import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
font-family: 'OpenSans';
background: transparent;
font-size: 5rem;
position:fixed;
left:0px;
top:0px;
width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: transparent;
  backface-visibility: hidden;
 `;
 const TextWrapper = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 height: 50%;
 div{
     height: 10%;
     display: flex;
     justify-content: center;
 }
 a{
     height: 5%;
     width: 10%;
     color: inherit;
     text-decoration: underline;
    :link {text-decoration: none;};
    :visited {text-decoration: none;};
    :hover {text-decoration: underline;};
 }
 span {
     height: 100%;
    font-size: 1rem;
    display: inline-block;
    text-shadow: 0 0 0 whitesmoke;
    animation: fadein 3s both;
  }
  
  @keyframes fadein {
    from {
      transform:
        translate3d(-15rem,-8rem,0)
        rotate(40deg)
        skewX(-70deg)
        scale(1.5);
      text-shadow: 0 0 20px whitesmoke;
      opacity: 0;
    }
    
    to {
      
      opacity: 1;
    }
  }
 `;

const About = () => {

    const text = ["I'm Aiden Hyunseok Jung.", "I am a CS student in Grinnell College.", "I love coding and", "always want to use my knowledge and skills to help other people.", "Give me a chance to show my ability!", "Email"];
    const intersperse = (arr) => {

        let temp = arr.map((v)=>{
            return v.split("");
        })
        let sum=0;
        for(let i=0; i<temp.length; i++){
          for(let j=0; j<temp[i].length; j++){
            if(temp[i][j] ===" "){
              temp[i][j] = <span style={{animationDelay: `${((sum + j)/30)}s`}}>&nbsp;</span>;
          }else{
          temp[i][j] = <span style={{animationDelay: `${((sum + j)/30)}s`}}>{temp[i][j]}</span>;
          }
          }
          sum += temp[i].length;
        }
        return temp.map((v) => {
          return <div>{v}</div>;
        });
        }

    
 
    const contents = intersperse(text);
    const email = contents.pop();
  return (
    <>
    <Background>
    <TextWrapper>
    {contents}
    <a href="mailto:junghyun@grinnell.edu">
    {email}
    </a>
    </TextWrapper>
  </Background>
    </>
  );
};

export default About;