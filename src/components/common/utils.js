import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-scroll';

// Common container component
export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
  
  @media (max-width: 1440px) {
    max-width: 1200px;
  }
  
  @media (max-width: 1200px) {
    max-width: 960px;
  }
  
  @media (max-width: 992px) {
    max-width: 720px;
  }
  
  @media (max-width: 768px) {
    max-width: 540px;
  }
  
  @media (max-width: 576px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

// Section titles
export const SectionTitle = styled.h2`
  font-family: 'Gilroy', sans-serif;
  font-weight: 400;
  font-size: 80px;
  line-height: 1em;
  color: #FFF;
  margin-top: 0;
  margin-bottom: 50px;
  
  @media (max-width: 992px) {
    font-size: 60px;
  }
  
  @media (max-width: 768px) {
    font-size: 48px;
  }
  
  @media (max-width: 576px) {
    font-size: 40px;
    margin-bottom: 30px;
  }
`;

// Section subtitles with badge
export const SectionSubtitle = styled.div`
  position: relative;
  display: inline-flex;
  margin-bottom: 20px;
  
  .badge {
    background-color: rgba(103, 78, 180, 0.2);
    position: relative;
    border-radius: 100px;
    padding: 10px 20px;
    backdrop-filter: blur(30px);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 100px;
      padding: 1.5px;
      background: linear-gradient(to bottom right, #837BD0, #4E4988, #231F4D, #231F4D, #4E4988, #837BD0);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
    
    span {
      font-family: 'Gilroy', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 1.3em;
      text-transform: uppercase;
      color: white;
      position: relative;
      z-index: 1;
    }
  }
  
  .shadow {
    position: absolute;
    bottom: -14px;
    left: 0;
    right: 0;
    height: 18px;
    background-color: rgba(21, 17, 61, 0.9);
    filter: blur(40px);
  }
`;

// Section description text
export const SectionDescription = styled.p`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 26px;
  line-height: 1.3em;
  color: #F6F5FF;
  margin-top: 0;
  margin-bottom: 0;
  max-width: 870px;
  
  @media (max-width: 992px) {
    font-size: 22px;
  }
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 576px) {
    font-size: 18px;
  }
`;

// Shiny animation for buttons
const shineAnimation = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

// Standard button
export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #385EFF;
  position: relative;
  border-radius: 20px;
  padding: 20px 30px;
  border: none;
  color: white;
  font-family: 'Gilroy', sans-serif;
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    background-size: 200% 100%;
    animation: ${shineAnimation} 3s linear infinite;
    pointer-events: none;
  }
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 31px;
    background-color: #15113D;
    filter: blur(40px);
    border-radius: 0 0 30px 30px;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    &::before {
      animation: ${shineAnimation} 1.5s linear infinite;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    &::before {
      animation: none;
    }
  }
`;

// Form submit button with the same shiny effect
export const FormSubmitButton = styled(Button)`
  width: 203px;
  height: 65px;
  border: 1px solid #5E7DFE;
`;

export const Section = styled.section`
  padding: 60px 0;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;