import React from 'react';
import styled from 'styled-components';
import { Container, Section, SectionTitle, SectionSubtitle, SectionDescription } from './common/utils';

const CustomersSection = styled(Section)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`;

const HeadingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const SectionMainDescription = styled(SectionDescription)`
  color: #F6F5FF;
`;

const CustomerCardsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 80px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  flex: 1;
  padding-top: ${props => props.paddingTop || '0'};
  
  @media (max-width: 1400px) {
    gap: 60px;
  }
  
  @media (max-width: 1200px) {
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const CustomerCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 422px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CardContent = styled.div`
  position: absolute;
  bottom: ${props => props.bottom || '20px'};
  left: 20px;
  z-index: 2;
`;

const CardTitle = styled.h3`
  font-family: 'Gilroy', sans-serif;
  font-weight: 500;
  font-size: 38px;
  line-height: 1.3;
  color: white;
  margin-bottom: 10px;
  max-width: ${props => props.maxWidth || 'auto'};
  white-space: pre-line;
`;

const CardButton = styled.a`
  background-color: #385EFF;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Gilroy', sans-serif;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #5E7DFE;
  cursor: pointer;
  text-decoration: none;
  color: white;
  width: fit-content;
`;

const ButtonArrow = styled.span`
  display: inline-block;
  width: 23px;
  height: 16px;
  background-image: url('/images/arrow-btn.svg');
  background-repeat: no-repeat;
  background-position: center;
`;

const CardDescription = styled.p`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 26px;
  line-height: 1.3;
  color: white;
  margin: 0;
`;

const Customers = () => {
  const customers = [
    {
      id: 1,
      title: 'Для бизнеса',
      description: 'Тем, кто ищет масштабируемые решения для своих команд разработчиков',
      image: '/images/business.jpg',
      contentBottom: '20px'
    },
    {
      id: 2,
      title: 'Для стартапов',
      description: 'Тем, кому нужны надежные сервисы для сборок без лишних проблем',
      image: '/images/startup.jpg',
      contentBottom: '20px'
    },
    {
      id: 3,
      title: 'Для инди- разработчиков',
      description: 'Тем, кто стремится оптимизировать свой рабочий процесс',
      image: '/images/indie.jpg',
      titleMaxWidth: '279px',
      contentBottom: '20px'
    },
    {
      id: 4,
      title: 'Для уставших\nот платежных ограничений',
      description: 'Тем, для кого важна оплата в один клик с карты российских банков',
      image: '/images/payment.jpg',
      titleMaxWidth: '334px',
      contentBottom: '20px'
    }
  ];

  const scrollToForm = (e) => {
    e.preventDefault();
    const formSection = document.getElementById('contact');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CustomersSection id="customers">
      <Container>
        <TextsContainer>
          <HeadingsContainer>
            <SectionSubtitle>
              <div className="badge">
                <span>Наши клиенты</span>
              </div>
              <div className="shadow"></div>
            </SectionSubtitle>
            
            <SectionTitle>Кому подойдет сервис?</SectionTitle>
          </HeadingsContainer>
          
          <SectionMainDescription>
            Наш сервис создан для тех, кто ценит своё время, ресурсы и комфорт в разработке. Мы предлагаем простое, но мощное решение для разных задач — от личных проектов до корпоративных процессов.
          </SectionMainDescription>
        </TextsContainer>
        <CustomerCardsContainer>
          <VerticalContainer>
            {customers.slice(0, 2).map((customer) => (
              <CustomerCard key={customer.id}>
                <CardImageContainer>
                  <CardImage src={customer.image} alt={customer.title} />
                  <CardOverlay />
                  <CardContent bottom={customer.contentBottom}>
                    <CardTitle maxWidth={customer.titleMaxWidth}>{customer.title}</CardTitle>
                    <CardButton href="#contact" onClick={scrollToForm}>
                      Оставить заявку
                      <ButtonArrow />
                    </CardButton>
                  </CardContent>
                </CardImageContainer>
                <CardDescription>{customer.description}</CardDescription>
              </CustomerCard>
            ))}
          </VerticalContainer>
          
          <VerticalContainer paddingTop="80px">
            {customers.slice(2, 4).map((customer) => (
              <CustomerCard key={customer.id}>
                <CardImageContainer>
                  <CardImage src={customer.image} alt={customer.title} />
                  <CardOverlay />
                  <CardContent bottom={customer.contentBottom}>
                    <CardTitle maxWidth={customer.titleMaxWidth}>{customer.title}</CardTitle>
                    <CardButton href="#contact" onClick={scrollToForm}>
                      Оставить заявку
                      <ButtonArrow />
                    </CardButton>
                  </CardContent>
                </CardImageContainer>
                <CardDescription>{customer.description}</CardDescription>
              </CustomerCard>
            ))}
          </VerticalContainer>
        </CustomerCardsContainer>
      </Container>
    </CustomersSection>
  );
};

export default Customers; 