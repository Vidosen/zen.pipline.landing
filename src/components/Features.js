import React from 'react';
import styled from 'styled-components';
import { Container, Section, SectionTitle, SectionSubtitle, SectionDescription } from './common/utils';

const FeaturesSection = styled(Section)`
  position: relative;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 130px 128px;
  margin-top: 80px;
  padding: 0 106px 0 208px;
  
  @media (max-width: 1200px) {
    padding: 0;
    grid-gap: 80px 40px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 60px;
  }
`;

const FeatureCard = styled.div`
  position: relative;
  padding: 60px 0;
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 20px;
  background-color: transparent;
  
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

const FeatureIconContainer = styled.div`
  position: absolute;
  top: -30px;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const FeatureTitle = styled.div`
  position: absolute;
  top: -30px;
  left: 30px;
`;

const FeatureDescription = styled.p`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 24px;
  line-height: 1.3;
  text-align: center;
  color: #F6F5FF;
  padding: 0 20px;
  max-width: 90%;
  margin: 27px 0 0;
`;

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'Оптимизируйте расходы',
      icon: '/images/feature-1.svg',
      description: 'Возможность сборки без необходимости приобретать дорогостоящую продукцию'
    },
    {
      id: 2,
      title: 'Всё готово к работе',
      icon: '/images/feature-2.svg',
      description: 'Доступ к надежной и масштабируемой инфраструктуре'
    },
    {
      id: 3,
      title: 'МЫ на связи',
      icon: '/images/feature-3.svg',
      description: 'Экспертная поддержка для ваших потребностей в разработке'
    },
    {
      id: 4,
      title: 'Ускорьте свою разработку',
      icon: '/images/feature-4.svg',
      description: 'Экономия времени и ресурсов на управлении сборками'
    },
    {
      id: 5,
      title: 'Оплата без проблем',
      icon: '/images/feature-5.svg',
      description: 'Удобные способы оплаты картой РФ, СБП, а так же криптовалютами'
    }
  ];

  return (
    <FeaturesSection id="features">
      <Container>
        <SectionSubtitle>
          <div className="badge">
            <span>Наши преимущества</span>
          </div>
          <div className="shadow"></div>
        </SectionSubtitle>
        
        <SectionTitle>Почему выбирают нас?</SectionTitle>
        
        <SectionDescription>
          Разрабатывать приложения для iOS и macOS стало проще, чем когда-либо. Наш сервис избавляет вас от рутинных задач и дорогостоящих инвестиций в оборудование, предоставляя всё необходимое для комфортной работы в облаке.
        </SectionDescription>
      </Container>
      
      <FeaturesGrid>
        {features.map(feature => (
          <FeatureCard key={feature.id}>
            <FeatureIconContainer>
              <SectionSubtitle>
                <div className="badge">
                  <span>{feature.title}</span>
                </div>
                <div className="shadow"></div>
              </SectionSubtitle>
            </FeatureIconContainer>
            <FeatureIcon>
              <img src={feature.icon} alt={feature.title} />
            </FeatureIcon>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
};

export default Features; 