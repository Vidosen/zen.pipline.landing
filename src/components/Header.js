import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { Container } from './common/utils';

const HeaderContainer = styled.header`
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background-color: rgba(17, 10, 39, 0.7);
`;

const HeaderInner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 110px;
  
  @media (max-width: 1024px) {
    gap: 50px;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const Logo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;
  width: 90px;
  
  .logo-blur-bg {
    position: absolute;
    top: 0;
    left: 32px;
    width: 36px;
    height: 36px;
    filter: blur(4px);
  }
  
  .logo-svg {
    position: relative;
    z-index: 1;
    height: 30px;
    margin-top: 3px;
  }
  
  @media (max-width: 768px) {
    width: 65px;
    height: 26px;
    
    .logo-blur-bg {
      left: 23px;
      width: 26px;
      height: 26px;
    }
    
    .logo-svg {
      height: 22px;
      margin-top: 2px;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 50px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-family: 'Gilroy', sans-serif;
  font-weight: 400;
  font-size: 18px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 65px;
  background-color: rgba(103, 78, 180, 0.2);
  backdrop-filter: blur(20px);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(103, 78, 180, 0.3);
    transform: translateY(-2px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 65px;
    padding: 1px;
    background: linear-gradient(to bottom right, #837BD0, #4E4988, #231F4D, #231F4D, #4E4988, #837BD0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  
  img {
    width: 21px;
    height: 21px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  background-color: #110A27;
  padding: 20px;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 20px;
  z-index: 999;
`;

const MobileNavLink = styled(Link)`
  color: white;
  font-family: 'Gilroy', sans-serif;
  font-weight: 400;
  font-size: 18px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <HeaderContainer>
      <HeaderInner>
        <HeaderLeft>
          <Logo>
            <img className="logo-blur-bg" src="/images/logo-blur-bg.png" alt="" aria-hidden="true" />
            <img className="logo-svg" src="/images/logo.svg" alt="Zen Pipeline" />
          </Logo>
          <Navigation>
            <NavLink to="about" smooth={true} duration={500}>О нас</NavLink>
            <NavLink to="contact" smooth={true} duration={500}>Оставить заявку</NavLink>
          </Navigation>
        </HeaderLeft>
        
        <HeaderRight>
          <ContactInfo>
            <SocialLinks>
              <SocialIcon href="https://t.me/+LKsXOu6g3DkwNjgy" target="_blank" rel="noopener noreferrer">
                <img src="/images/icon-telegram.svg" alt="Telegram" />
              </SocialIcon>
              <SocialIcon href="https://vk.com/zen.pipeline" target="_blank" rel="noopener noreferrer">
                <img src="/images/icon-vk.svg" alt="VK" />
              </SocialIcon>
            </SocialLinks>
          </ContactInfo>
          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </HeaderRight>
      </HeaderInner>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavLink to="about" smooth={true} duration={500} onClick={() => setMobileMenuOpen(false)}>
          О нас
        </MobileNavLink>
        <MobileNavLink to="contact" smooth={true} duration={500} onClick={() => setMobileMenuOpen(false)}>
          Оставить заявку
        </MobileNavLink>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header; 