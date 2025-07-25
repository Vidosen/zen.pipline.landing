import React from 'react';
import styled from 'styled-components';
import { Container, Section, SectionTitle, SectionSubtitle, SectionDescription } from './common/utils';

const AboutSection = styled(Section)`
  position: relative;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-top: 70px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: linear-gradient(to right bottom, #1F2553, #13183D, #13183D, #1F2553);
  border: 1px solid;
  border-image: linear-gradient(to bottom right, #837BD0, #4E4988, #19163F, #19163F, #4E4988, #837BD0) 1;
  border-radius: 20px;
  padding: 38px 26px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
`;

const FeatureIcon = styled.div`
  position: absolute;
  top: -30px;
  left: calc(50% - 30px);
  width: 60px;
  height: 60px;
  background: linear-gradient(to right bottom, #1F2553, #13183D, #13183D, #1F2553);
  border: 1px solid;
  border-image: linear-gradient(to bottom right, #837BD0, #4E4988, #19163F, #19163F, #4E4988, #837BD0) 1;
  border-radius: 60px;
  backdrop-filter: blur(17px);
  display: flex;
  justify-content: center;
  align-items: center;
  
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
      title: 'Простая настройка с минимальной конфигурацией'
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
        <SectionSubtitle>
          <div className="badge">
            <span>О сервисе</span>
          </div>
          <div className="shadow"></div>
        </SectionSubtitle>
        
        <SectionTitle>Мы позаботимся о сборках</SectionTitle>
        
        <SectionDescription>
          Zen Pipeline предоставляет автоматизированные сервисы для сборки iOS и macOS приложений, созданных специально для российских разработчиков.
        </SectionDescription>
        
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