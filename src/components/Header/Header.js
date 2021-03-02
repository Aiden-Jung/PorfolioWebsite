import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../Logo/Logo';

const Navbar = styled.nav`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100px;
  width: 100vw;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  * {
    margin: 0;
  }
`;

const LogoWrapper = styled(Link)`
  height: 50%;
  padding-left: 30px;
  svg {
    height: 100%;
    fill: white;
  }
`;

const NavItems = styled.div`
  padding-right: 20px;
  font-family: 'Montserrat';
  font-size: 1.25rem;
`;

const NavbarLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 1.25rem;
`;

const Header = () => {
  return (
    <Navbar>
      <LogoWrapper to="/">
        <Logo />
      </LogoWrapper>
      <NavItems>
        <NavbarLink to="/project">Project</NavbarLink>
        <NavbarLink to="/about">About</NavbarLink>
      </NavItems>
    </Navbar>
  );
};

export default Header;
