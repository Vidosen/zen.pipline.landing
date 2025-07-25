import React from 'react';
import styled from 'styled-components';
import { Container } from './common/utils';

const FooterContainer = styled.footer`
  background-color: #140934;
  padding: 40px 0;
`;

const FooterInner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  gap: 92px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

const Logo = styled.div`
  img {
    height: 48px;
  }
`;

const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterHeading = styled.h4`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 15px;
  text-transform: uppercase;
  color: white;
  margin: 0;
`;

const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
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

const FooterSocials = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialIcon = styled.a`
  width: 24px;
  height: 24px;
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
        <FooterLeft>
          <Logo>
            <img src="/images/logo.svg" alt="Zen Pipeline" />
          </Logo>
          <FooterContact>
            <FooterHeading>Для связи</FooterHeading>
            <ContactWrapper>
              <TelegramIcon>
                <img src="/images/icon-telegram.svg" alt="Telegram" />
              </TelegramIcon>
              <ContactText>Tg @zen_pipeline</ContactText>
            </ContactWrapper>
          </FooterContact>
        </FooterLeft>
        <FooterSocials>
          <FooterHeading>Мы в социальных сетях</FooterHeading>
          <SocialIcons>
            <SocialIcon href="https://vk.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/icon-vk.svg" alt="VK" />
            </SocialIcon>
            <SocialIcon href="https://t.me/zen_pipeline" target="_blank" rel="noopener noreferrer">
              <img src="/images/icon-telegram.svg" alt="Telegram" />
            </SocialIcon>
          </SocialIcons>
        </FooterSocials>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer; 