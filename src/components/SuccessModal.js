import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1a1040 0%, #2a1a50 100%);
  border: 1px solid #4E4988;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  font-size: 24px;
  color: #CAC3C3;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #fff;
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4E4988, #837BD0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-size: 40px;
  color: white;
`;

const Title = styled.h2`
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #F6F5FF;
  margin-bottom: 15px;
`;

const Message = styled.p`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 18px;
  color: #E8E6E6;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const SocialSection = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #4E4988;
`;

const SocialTitle = styled.h3`
  font-family: 'Gilroy', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #F6F5FF;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #4E4988, #837BD0);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-family: 'Gilroy', sans-serif;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #837BD0, #4E4988);
    transform: translateY(-2px);
  }
  
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <SuccessIcon>✓</SuccessIcon>
        
        <Title>Спасибо за регистрацию!</Title>
        
        <Message>
          Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время для предоставления доступа к beta-версии платформы.
        </Message>
        
        <SocialSection>
          <SocialTitle>Следите за новостями проекта:</SocialTitle>
          <SocialLinks>
            <SocialLink href="https://t.me/+LKsXOu6g3DkwNjgy" target="_blank" rel="noopener noreferrer">
              <img src="/images/icon-telegram.svg" alt="Telegram" />
              Telegram
            </SocialLink>
            
            <SocialLink href="https://vk.com/zen.pipeline" target="_blank" rel="noopener noreferrer">
              <img src="/images/icon-vk.svg" alt="VK" />
              VKontakte
            </SocialLink>
          </SocialLinks>
        </SocialSection>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SuccessModal; 