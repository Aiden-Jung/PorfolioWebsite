import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo'

const Navbar = styled.nav`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100px;
  width: 100vw;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
`;

const LogoWrapper = styled(Link)`
  svg{
    height: 40%;
    position: absolute;
       left: 100px;
       top: 50%;
       fill: white;
       transform: translate(-50%, -50%);
  }
`;

const NavItems = styled.div`
  padding-right: 1.5rem;
  font-family: 'OpenSans'; 
  font-size: 1rem;
`;

const NavbarLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 1rem;
`;

const Header = () => {
  return (
    <Navbar>
      <LogoWrapper to='/'><Logo/></LogoWrapper>
      <NavItems>
        <NavbarLink to='/work'>Work</NavbarLink>
        <NavbarLink to='/about'>About</NavbarLink>
      </NavItems>
    </Navbar>
  );
};

export default Header;