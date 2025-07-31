import React from 'react';
import styled from 'styled-components';
import { Container } from './common/utils';

const FooterContainer = styled.footer`
  background-color: #140934;
  padding: 30px 0;
`;

const FooterInner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
    padding: 0 20px;
  }
`;

const Logo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 65px;
  height: 26px;
  
  .logo-blur-bg {
    position: absolute;
    top: 0;
    left: 23px;
    width: 26px;
    height: 26px;
    filter: blur(5px);
  }
  
  .logo-svg {
    position: relative;
    z-index: 1;
    width: 65px;
    height: 22px;
    margin-top: 2px;
  }
`;

const FooterSocials = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const FooterHeading = styled.h4`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.15;
  text-transform: uppercase;
  color: white;
  margin: 0;
  text-align: center;
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SocialIcon = styled.a`
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <Logo>
          <img className="logo-blur-bg" src="/images/logo-blur-bg.png" alt="" aria-hidden="true" />
          <img className="logo-svg" src="/images/logo.svg" alt="Zen Pipeline" />
        </Logo>
        <FooterSocials>
          <FooterHeading>Мы в социальных сетях</FooterHeading>
          <SocialIcons>
            <SocialIcon href="https://vk.com/zen.pipeline" target="_blank" rel="noopener noreferrer">
              <img src="/images/icon-vk.svg" alt="VK" />
            </SocialIcon>
            <SocialIcon href="https://t.me/+LKsXOu6g3DkwNjgy" target="_blank" rel="noopener noreferrer">
              <img src="/images/icon-telegram.svg" alt="Telegram" />
            </SocialIcon>
          </SocialIcons>
        </FooterSocials>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer; 