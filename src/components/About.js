import React from 'react';
import styled from 'styled-components';
import { Container, Section, SectionTitle, SectionSubtitle, SectionDescription } from './common/utils';

const AboutSection = styled(Section)`
  position: relative;
`;

const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const HeadingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const StyledDescriptionContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    background-color: rgba(25, 16, 52, 0.1);
    position: relative;
    border-radius: 20px;
    padding: 20px;
    backdrop-filter: blur(30px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    
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
  }
`;

const StyledSectionDescription = styled(SectionDescription)`
  color: #F6F5FF;
  margin: 0;
`;

const DesktopDescription = styled(SectionDescription)`
  color: #F6F5FF;
  margin: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 70px;
  
  @media (max-width: 1200px) {
    gap: 40px;
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    gap: 40px;
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: linear-gradient(to right bottom, #1F2553, #13183D, #13183D, #1F2553);
  position: relative;
  border-radius: 20px;
  padding: 38px 26px;
  height: 175px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  width: 100%;
  
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
`;

const FeatureIcon = styled.div`
  position: absolute;
  top: -30px;
  left: calc(50% - 30px);
  width: 60px;
  height: 60px;
  background: linear-gradient(to right bottom, #1F2553, #13183D, #13183D, #1F2553);
  border-radius: 60px;
  backdrop-filter: blur(17px);
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 60px;
    padding: 1px;
    background: linear-gradient(to bottom right, #837BD0, #4E4988, #19163F, #19163F, #4E4988, #837BD0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 17px;
    background-color: #15113D;
    filter: blur(36px);
    border-radius: 0 0 295px 295px;
    z-index: -1;
  }
  
  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
`;

const FeatureTitle = styled.h3`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 22px;
  line-height: 1.3;
  color: #F6F5FF;
  max-width: 243px;
  margin: 0 auto;
  white-space: pre-line;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const About = () => {
  const features = [
    {
      id: 1,
      icon: '/images/icon-1.svg',
      title: 'Бесшовная интеграция с вашим рабочим процессом'
    },
    {
      id: 2,
      icon: '/images/icon-2.svg',
      title: 'Высокая производительность сборки'
    },
    {
      id: 3,
      icon: '/images/icon-3.svg',
      title: 'Простая настройка \nс минимальной конфигурацией'
    },
    {
      id: 4,
      icon: '/images/icon-4.svg',
      title: 'Мониторинг сборок в реальном времени и уведомления'
    }
  ];

  return (
    <AboutSection id="about">
      <Container>
        <TextsContainer>
          <HeadingsContainer>
            <SectionSubtitle>
              <div className="badge">
                <span>О сервисе</span>
              </div>
              <div className="shadow"></div>
            </SectionSubtitle>
            
            <SectionTitle>Мы позаботимся о сборках</SectionTitle>
          </HeadingsContainer>
          
          <DesktopDescription>
            Zen Pipeline предоставляет автоматизированные сервисы для сборки iOS и macOS приложений, созданных специально для российских разработчиков.
          </DesktopDescription>
          
          <StyledDescriptionContainer>
            <StyledSectionDescription>
              Zen Pipeline предоставляет автоматизированные сервисы для сборки iOS и macOS приложений, созданных специально для российских разработчиков.
            </StyledSectionDescription>
          </StyledDescriptionContainer>
        </TextsContainer>
        
        <FeaturesGrid>
          {features.map(feature => (
            <FeatureCard key={feature.id}>
              <FeatureIcon>
                <img src={feature.icon} alt={feature.title} />
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </AboutSection>
  );
};

export default About; 