import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, SectionTitle, SectionSubtitle, SectionDescription, FormSubmitButton } from './common/utils';
import { ContactDecorations } from './common/BackgroundDecorations';

const ContactSection = styled.section`
  padding: 120px 0;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 75px;
  gap: 235px;
  
  @media (max-width: 1200px) {
    gap: 100px;
  }
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 60px;
  }
`;

const ContactForm = styled.div`
  max-width: 507px;
  width: 100%;
`;

const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
`;

// Base input wrapper with gradient border - new implementation
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border-radius: 100px;
  background: 
    linear-gradient(#191034, #191034) padding-box,
    linear-gradient(to bottom right, #837BD0, #4E4988, #231F4D, #231F4D, #4E4988, #837BD0) border-box;
  border: 1.5px solid transparent;
  transition: border 0.3s ease, background 0.3s ease;
  
  /* Hover state */
  &:hover {
    background: 
      linear-gradient(#241A40, #241A40) padding-box,
      linear-gradient(to bottom right, #837BD0, #4E4988, #4E4988, #837BD0) border-box;
  }
  
  /* Focus state */
  &:focus-within {
    background: 
      linear-gradient(#191034, #191034) padding-box,
      linear-gradient(to bottom right, #837BD0, #4E4988, #4E4988, #837BD0) border-box;
  }
`;

// Base input styling
const Input = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  border-radius: 100px;
  padding: 20px 30px;
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 17px;
  color: #F6F5FF;
  
  &::placeholder {
    color: #E8E6E6;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  
  &:focus {
    outline: none;
  }
  
  /* Focus state styling */
  &:focus::placeholder {
    font-size: 12px;
    transform: translateY(-8px);
    color: #CAC3C3;
    opacity: 1;
  }
`;

// Text area wrapper with same styling as input but different border radius
const TextAreaWrapper = styled(InputWrapper)`
  height: 200px;
  border-radius: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  border-radius: 20px;
  padding: 20px 30px;
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 17px;
  color: #F6F5FF;
  resize: none;
  
  &::placeholder {
    color: #E8E6E6;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  
  &:focus {
    outline: none;
  }
  
  &:focus::placeholder {
    font-size: 12px;
    transform: translateY(-8px);
    color: #CAC3C3;
    opacity: 1;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 40px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #CAC3C3;
  border-radius: 4px;
  margin-top: 3px;
  cursor: pointer;
  
  &:checked {
    accent-color: #4E4988;
  }
`;

const CheckboxLabel = styled.label`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 17px;
  color: #E8E6E6;
  cursor: pointer;
`;

const ContactImageWrapper = styled.div`
  flex: 1;
  position: relative;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ContactDecorationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  z-index: 1;
  
  /* Ensure content in the wrapper doesn't affect height */
  & > * {
    position: absolute;
  }
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    agreement: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };
  
  return (
    <ContactSection id="contact">
      <Container>
        <SectionSubtitle>
          <div className="badge">
            <span>Ответим на ваши вопросы</span>
          </div>
          <div className="shadow"></div>
        </SectionSubtitle>
        
        <SectionTitle>Получите ответы на ваши вопросы</SectionTitle>
        
        <SectionDescription>
          Если у вас остались вопросы — заполните форму ниже. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.
        </SectionDescription>
        
        <ContactContainer>
          <ContactForm>
            <form onSubmit={handleSubmit}>
              <FormInputs>
                <InputWrapper>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Ваше имя*"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </InputWrapper>
                <InputWrapper>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+7 (___) __-__-___*"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </InputWrapper>
                <TextAreaWrapper>
                  <TextArea
                    name="message"
                    placeholder="Оставьте свой вопрос здесь"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </TextAreaWrapper>
              </FormInputs>
              
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  name="agreement"
                  id="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  required
                />
                <CheckboxLabel htmlFor="agreement">
                  Я принимаю политику обработки персональных данных
                </CheckboxLabel>
              </CheckboxContainer>
              
              <FormSubmitButton type="submit">Перезвоните мне</FormSubmitButton>
            </form>
          </ContactForm>
          
          <ContactImageWrapper>
            <ContactDecorationWrapper>
              <ContactDecorations />
            </ContactDecorationWrapper>
          </ContactImageWrapper>
        </ContactContainer>
      </Container>
    </ContactSection>
  );
};

export default Contact; 