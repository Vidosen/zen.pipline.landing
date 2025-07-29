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
  
  svg {
    width: 20px;
    height: 20px;
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
            <SocialLink href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.9 1.21-5.36 3.55-.51.36-.97.53-1.39.52-.46-.01-1.34-.26-1.99-.47-.8-.26-1.44-.4-1.38-.85.03-.23.36-.47.99-.72 3.88-1.69 6.48-2.8 7.82-3.35 3.73-1.56 4.5-1.83 5.01-1.84.11 0 .36.03.52.17.13.12.17.27.19.38-.01.06-.01.24-.01.24z"/>
              </svg>
              Telegram
            </SocialLink>
            
            <SocialLink href="https://vk.com/your_group" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.131-.427.131-.427s-.019-1.307.587-1.5c.597-.189 1.362.263 2.173.631.615.279 1.083.217 1.083.217l2.175-.03s1.137-.07.598-.963c-.044-.073-.312-.657-1.597-1.86-1.344-1.258-1.164-.928.454-2.844.985-1.165 1.378-1.875 1.25-2.18-.122-.29-.872-.214-.872-.214l-2.447.015s-.181-.025-.315.056c-.131.079-.215.263-.215.263s-.387 1.029-.903 1.906c-1.087 1.85-1.522 1.948-1.699 1.833-.41-.267-.308-1.073-.308-1.645 0-1.79.271-2.537-.529-2.729-.265-.064-.459-.106-1.135-.113-.867-.009-1.601.003-2.016.206-.276.135-.489.436-.359.453.161.021.525.098.718.36.249.338.24 1.097.24 1.097s.143 2.109-.333 2.371c-.329.18-.779-.188-1.746-1.873-.495-.849-.869-1.789-.869-1.789s-.072-.177-.2-.272c-.155-.115-.372-.151-.372-.151l-2.327.015s-.349.01-.477.161c-.114.135-.009.414-.009.414s1.816 4.249 3.873 6.392c1.887 1.967 4.025 1.837 4.025 1.837z"/>
              </svg>
              VKontakte
            </SocialLink>
          </SocialLinks>
        </SocialSection>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SuccessModal; 