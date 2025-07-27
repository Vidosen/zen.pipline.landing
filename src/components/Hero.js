import React from 'react';
import styled from 'styled-components';
import { Container, SectionTitle, SectionSubtitle, Button, SectionDescription } from './common/utils';

const HeroSection = styled.section`
  padding: 120px 0 0;
  display: flex;
  position: relative;
  overflow: visible;
  background-color: transparent;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 768px;
  position: relative;
  z-index: 10;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Semi-transparent container for the call to action
const CallToAction = styled.div`
  background-color: rgba(25, 16, 52, 0.3);
  position: relative;
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(to bottom right, #837BD0, #4E4988, #19163F, #19163F, #4E4988, #837BD0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ActionButton = styled(Button)`
  margin-top: 30px;
`;

const Hero = () => {
  return (
    <HeroSection id="home">
      <Container>
        <HeroContent>
          <SectionSubtitle>
            <div className="badge">
              <span>Сборки без компромиссов</span>
            </div>
            <div className="shadow"></div>
          </SectionSubtitle>
          
          <SectionTitle>Облачные сборки для iOS и macOS</SectionTitle>
          
          <CallToAction>
            <SectionDescription>
              Автоматизируйте свои сборки без лишних хлопот. Заполните форму сейчас и получите пробный период бесплатно.
            </SectionDescription>
            <ActionButton>Оставить заявку</ActionButton>
          </CallToAction>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero; 