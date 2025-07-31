import React from 'react';
import styled from 'styled-components';
import { Container, SectionTitle, SectionDescription } from './common/utils';
import ShinyButton from './Hero/ShinyButton';
import HeroBackgroundDecorations from './common/BackgroundDecorations';

const HeroSection = styled.section`
  padding-top: 120px;
  padding-bottom: 80px;
  display: flex;
  position: relative;
  overflow: visible;
  background-color: transparent;
  width: 100%;

  @media (max-width: 768px) {
    padding-bottom: 40px;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 768px;
  position: relative;
  z-index: 20;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Semi-transparent container for the call to action
const CallToAction = styled.div`
  background-color: rgba(25, 16, 52, 0.2);
  position: relative;
  border-radius: 20px;
  padding: 30px 40px;
  backdrop-filter: blur(30px);
  margin-top: 10px;
  
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
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ActionButtonWrapper = styled.div`
  margin-top: 40px;
  
  @media (max-width: 768px) {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const HeroDecorationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  z-index: 0;
  
  /* Ensure content in the wrapper doesn't affect the Hero section's height */
  & > * {
    position: absolute;
  }
`;



const Hero = () => {
  return (
    <HeroSection id="home">
      {/* Move decorations outside Container to prevent clipping */}
      <HeroDecorationWrapper>
        <HeroBackgroundDecorations sectionId="home" />
      </HeroDecorationWrapper>
      
      <Container>
        <HeroContent>
          
          <SectionTitle>Облачные сборки для iOS и macOS</SectionTitle>
          
          <CallToAction>
            <SectionDescription>
              Автоматизируйте свои сборки без лишних хлопот. Станьте частью beta-тестирования и получите пробный период бесплатно.
            </SectionDescription>
            <ActionButtonWrapper>
              <ShinyButton 
                to="contact" 
                smooth={true} 
                duration={800} 
                offset={-50}
              >
                Оставить заявку
              </ShinyButton>
            </ActionButtonWrapper>
          </CallToAction>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero; 