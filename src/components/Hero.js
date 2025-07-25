import React from 'react';
import styled from 'styled-components';
import { Container, SectionTitle, SectionSubtitle, Button, SectionDescription } from './common/utils';

const HeroSection = styled.section`
  padding: 120px 0 0;
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 600px;
  position: relative;
  z-index: 10;
`;

const HeroImageContainer = styled.div`
  position: absolute;
  right: -20%;
  top: -15%;
  width: 100%;
  height: 120%;
  z-index: 1;
  
  @media (max-width: 1200px) {
    opacity: 0.4;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  top: -5%;
  right: -10%;
  width: 879px;
  height: 879px;
  border-radius: 50%;
  background-color: #221056;
  filter: blur(500px);
  z-index: 0;
`;

const CallToAction = styled.div`
  background-color: rgba(25, 16, 52, 0.1);
  border: 1px solid;
  border-image: linear-gradient(to bottom right, #837BD0, #4E4988, #19163F, #19163F, #4E4988, #837BD0) 1;
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(80px);
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
            <Button>Оставить заявку</Button>
          </CallToAction>
        </HeroContent>
      </Container>
      
      <HeroBg />
      <HeroImageContainer>
        <img 
          src="/images/hero-bg.png" 
          alt="Mac device visualization"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </HeroImageContainer>
    </HeroSection>
  );
};

export default Hero; 