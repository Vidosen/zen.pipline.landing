import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, SectionTitle, SectionSubtitle, SectionDescription, FormSubmitButton } from './common/utils';
import { ContactDecorations } from './common/BackgroundDecorations';
import SuccessModal from './SuccessModal';

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

// Enhanced input wrapper with floating label
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

// Floating label component
const FloatingLabel = styled.label`
  position: absolute;
  left: 30px;
  top: ${props => props.isFloating ? '8px' : '50%'};
  transform: translateY(${props => props.isFloating ? '0' : '-50%'});
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: ${props => props.isFloating ? '12px' : '17px'};
  color: ${props => props.isFloating ? '#CAC3C3' : '#E8E6E6'};
  opacity: ${props => props.isFloating ? '1' : '0.7'};
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: ${props => props.isFloating ? '3' : '1'};
`;

// Enhanced input without placeholder
const Input = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  border-radius: 100px;
  padding: ${props => props.hasFloatingLabel ? '25px 30px 15px 30px' : '20px 30px'};
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 17px;
  color: #F6F5FF;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: transparent;
  }
`;

// Phone mask display background
const PhoneMaskBackground = styled.div`
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 17px;
  color: #666;
  opacity: 1;
  pointer-events: none;
  z-index: 1;
  padding: 0;
  margin: 0;
  line-height: 1;
  margin-top: 5px; /* Adjust for the input's top padding difference */
  letter-spacing: 0.5px; /* Increase horizontal spacing between characters */
`;

// Phone input with interactive mask
const PhoneInput = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  border-radius: 100px;
  padding: 25px 30px 15px 30px;
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 17px;
  color: #F6F5FF;
  position: relative;
  z-index: 2;
  line-height: 1;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: transparent;
  }
  
  /* Ensure this input overrides any inherited styles */
  &[type="tel"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
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

// Enhanced Input Component with floating label
const EnhancedInput = ({ label, type, name, value, onChange, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.length > 0;

  return (
    <InputWrapper>
      <FloatingLabel isFloating={isFloating}>
        {label}{required && '*'}
      </FloatingLabel>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        hasFloatingLabel={true}
        required={required}
      />
    </InputWrapper>
  );
};

// Enhanced Phone Input with interactive formatting
const EnhancedPhoneInput = ({ label, name, value, onChange, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Initialize with +7 if empty
  React.useEffect(() => {
    if (value === '') {
      onChange({
        target: {
          name,
          value: '+7'
        }
      });
    }
  }, []);

  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digits
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Handle Russian phone number format
    if (cleaned.length === 0) return '+7';
    if (cleaned.length === 1) return '+7';
    
    // Start with +7
    let formatted = '+7';
    
    // Add area code in parentheses (digits 1-3)
    if (cleaned.length > 1) {
      const areaCode = cleaned.slice(1, 4);
      formatted += ` (${areaCode}`;
      
      // Close parenthesis only when we have 3+ area code digits or moving to next section
      if (cleaned.length >= 4) {
        formatted += ')';
        
        // Add first part of number (digits 4-6)
        if (cleaned.length > 4) {
          const part1 = cleaned.slice(4, 7);
          formatted += ` ${part1}`;
          
          // Add second part (digits 7-8)
          if (cleaned.length > 7) {
            const part2 = cleaned.slice(7, 9);
            formatted += `-${part2}`;
            
            // Add third part (digits 9-10)
            if (cleaned.length > 9) {
              const part3 = cleaned.slice(9, 11);
              formatted += `-${part3}`;
            }
          }
        }
      }
    }
    
    return formatted;
  };

  const getBackgroundMask = () => {
    // Always return the same static mask
    return '+7 (___) ___-__-__';
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    
    // If user tries to delete the +7 part, keep at least +7
    if (!input.startsWith('+7') || input.length < 2) {
      // Extract just the digits
      const digits = input.replace(/\D/g, '');
      input = digits;
    }
    
    const formatted = formatPhoneNumber(input);
    onChange({
      target: {
        name,
        value: formatted
      }
    });
  };

  const handleKeyDown = (e) => {
    // Prevent deleting +7 prefix
    if ((e.key === 'Backspace' || e.key === 'Delete') && value.length <= 2) {
      e.preventDefault();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Ensure +7 is present when focusing
    if (value === '' || value === '+7') {
      onChange({
        target: {
          name,
          value: '+7'
        }
      });
    }
  };

  return (
    <InputWrapper>
      <PhoneMaskBackground>{getBackgroundMask()}</PhoneMaskBackground>
      <PhoneInput
        type="tel"
        name={name}
        value={value}
        onChange={handlePhoneChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        required={required}
      />
    </InputWrapper>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+7',
    company: '',
    agreement: false
  });
  
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Предотвращаем двойную отправку
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          // Добавляем UTM параметры из URL
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign')
        })
      });
      
      if (response.ok) {
        setShowModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '+7',
          company: '',
          agreement: false
        });
      } else {
        console.error('Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact">
      <Container>
        <SectionSubtitle>
          <div className="badge">
            <span>Связаться с нами</span>
          </div>
          <div className="shadow"></div>
        </SectionSubtitle>
        
        <SectionTitle>Оставить заявку</SectionTitle>
        
        <SectionDescription>
          Готовы автоматизировать свои сборки? Оставьте заявку, и мы свяжемся с вами в течение 24 часов для обсуждения деталей интеграции и настройки вашего проекта.
        </SectionDescription>
        
        <ContactContainer>
          <ContactForm>
            <form onSubmit={handleSubmit}>
              <FormInputs>
                <EnhancedInput
                  label="Ваше имя"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <EnhancedInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <EnhancedPhoneInput
                  label="+7 (___) __-__-___"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <EnhancedInput
                  label="Название компании (необязательно)"
                  type="text"
                  name="company"
                  value={formData.company}
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
                  Я принимаю политику обработки персональных данных и согласен получать информацию о продукте
                </CheckboxLabel>
              </CheckboxContainer>
              
              <FormSubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Отправляем...' : 'Оставить заявку'}
              </FormSubmitButton>
            </form>
          </ContactForm>
          
          <ContactImageWrapper>
            <ContactDecorationWrapper>
              <ContactDecorations />
            </ContactDecorationWrapper>
          </ContactImageWrapper>
        </ContactContainer>
      </Container>
      
      <SuccessModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </ContactSection>
  );
};

export default Contact;