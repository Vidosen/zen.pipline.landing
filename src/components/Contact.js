import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Section, SectionTitle, SectionSubtitle, SectionDescription, Button } from './common/utils';

const ContactSection = styled(Section)`
  position: relative;
`;

const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 75px;
  
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

const Input = styled.input`
  width: 100%;
  height: 70px;
  background-color: #191034;
  border: 1px solid;
  border-image: linear-gradient(to bottom right, #837BD0, #4E4988, #19163F, #19163F, #4E4988, #837BD0) 1;
  border-radius: 100px;
  padding: 20px 30px;
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 17px;
  color: #F6F5FF;
  
  &::placeholder {
    color: #E8E6E6;
    opacity: 0.7;
  }
  
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  background-color: #191034;
  border: 1px solid;
  border-image: linear-gradient(to bottom right, #837BD0, #4E4988, #19163F, #19163F, #4E4988, #837BD0) 1;
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
  }
  
  &:focus {
    outline: none;
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
`;

const CheckboxLabel = styled.label`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 17px;
  color: #E8E6E6;
`;

const ContactImage = styled.div`
  flex: 1;
  height: 750px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  @media (max-width: 1024px) {
    height: 500px;
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
                <Input
                  type="text"
                  name="name"
                  placeholder="Ваше имя*"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+7 (___) __-__-___*"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <TextArea
                  name="message"
                  placeholder="Оставьте свой вопрос здесь"
                  value={formData.message}
                  onChange={handleChange}
                />
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
              
              <Button type="submit">Перезвоните мне</Button>
            </form>
          </ContactForm>
          
          <ContactImage>
            <img src="/images/contact-image.jpg" alt="Contact us" />
          </ContactImage>
        </ContactContainer>
      </Container>
    </ContactSection>
  );
};

export default Contact; 