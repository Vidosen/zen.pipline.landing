import React from 'react';
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

const Logo = styled.div`
  img {
    height: 36px;
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

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TelegramIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 65px;
  background-color: rgba(103, 78, 180, 0.2);
  border: 0.5px solid;
  border-image: linear-gradient(to bottom right, #837BD0, #4E4988, #231F4D, #231F4D, #4E4988, #837BD0) 1;
  backdrop-filter: blur(20px);
  
  img {
    width: 21px;
    height: 21px;
  }
`;

const ContactText = styled.span`
  font-family: 'Gilroy', sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: white;
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

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        <Logo>
          <img src="/images/logo.svg" alt="Zen Pipeline" />
        </Logo>
        <Navigation>
          <NavLink to="about" smooth={true} duration={500}>О нас</NavLink>
          <NavLink to="contact" smooth={true} duration={500}>Оставить заявку</NavLink>
        </Navigation>
        <ContactInfo>
          <TelegramIcon>
            <img src="/images/icon-telegram.svg" alt="Telegram" />
          </TelegramIcon>
          <ContactText>Tg @zen_pipeline</ContactText>
        </ContactInfo>
        <MobileMenuButton>☰</MobileMenuButton>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header; 