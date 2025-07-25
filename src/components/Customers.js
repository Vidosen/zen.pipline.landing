import React from 'react';
import styled from 'styled-components';
import { Container, Section, SectionTitle, SectionSubtitle, SectionDescription, Button } from './common/utils';

const CustomersSection = styled(Section)`
  position: relative;
`;

const CustomerCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 80px 128px;
  margin-top: 70px;
  padding: 0 106px;
  
  @media (max-width: 1200px) {
    padding: 0;
    grid-gap: 60px 40px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 60px;
  }
`;

const CustomerCard = styled.div`
  position: relative;
  height: 422px;
  display: flex;
  flex-direction: column;
`;

const CustomerCardImage = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const CustomerCardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
`;

const CustomerCardTitle = styled.h3`
  font-family: 'Gilroy', sans-serif;
  font-weight: 500;
  font-size: 38px;
  line-height: 1.3;
  color: white;
  margin-bottom: 10px;
`;

const CustomerButton = styled(Button)`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::after {
    display: none;
  }
`;

const ButtonArrow = styled.span`
  display: inline-block;
  width: 23px;
  height: 16px;
  background-image: url('/images/arrow.svg');
  background-repeat: no-repeat;
  background-position: center;
`;

const CustomerDescription = styled.p`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 26px;
  line-height: 1.3;
  color: white;
  margin: 20px 0;
`;

const Customers = () => {
  const customers = [
    {
      id: 1,
      title: 'Для бизнеса',
      description: 'Тем, кто ищет масштабируемые решения для своих команд разработчиков',
      image: '/images/business.jpg'
    },
    {
      id: 2,
      title: 'Для стартапов',
      description: 'Тем, кому нужны надежные сервисы для сборок без лишних проблем',
      image: '/images/startup.jpg'
    },
    {
      id: 3,
      title: 'Для инди- разработчиков',
      description: 'Тем, кто стремится оптимизировать свой рабочий процесс',
      image: '/images/indie.jpg'
    },
    {
      id: 4,
      title: 'Для уставших от платежных ограничений',
      description: 'Тем, для кого важна оплата в один клик с карты российских банков',
      image: '/images/payment.jpg'
    }
  ];

  return (
    <CustomersSection id="customers">
      <Container>
        <SectionSubtitle>
          <div className="badge">
            <span>Наши клиенты</span>
          </div>
          <div className="shadow"></div>
        </SectionSubtitle>
        
        <SectionTitle>Кому подойдет сервис?</SectionTitle>
        
        <SectionDescription>
          Наш сервис создан для тех, кто ценит своё время, ресурсы и комфорт в разработке. Мы предлагаем простое, но мощное решение для разных задач — от личных проектов до корпоративных процессов.
        </SectionDescription>
      </Container>
      
      <CustomerCardsContainer>
        {customers.map(customer => (
          <CustomerCard key={customer.id}>
            <CustomerCardImage>
              <img src={customer.image} alt={customer.title} />
            </CustomerCardImage>
            <CustomerCardContent>
              <CustomerCardTitle>{customer.title}</CustomerCardTitle>
              <CustomerButton>
                Оставить заявку
                <ButtonArrow />
              </CustomerButton>
            </CustomerCardContent>
            <CustomerDescription>{customer.description}</CustomerDescription>
          </CustomerCard>
        ))}
      </CustomerCardsContainer>
    </CustomersSection>
  );
};

export default Customers; 