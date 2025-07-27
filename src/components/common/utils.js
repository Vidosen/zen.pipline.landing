import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-scroll';

export const Container = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding: 0 98px;
  
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-family: 'Gilroy', sans-serif;
  font-weight: 400;
  font-size: 60px;
  line-height: 1em;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

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
    width: 100%;
    height: 18px;
    background-color: rgba(21, 17, 61, 0.9);
    filter: blur(40px);
    border-radius: 0 0 20px 20px;
    z-index: -1;
  }
`;

export const SectionDescription = styled.p`
  font-family: 'Gilroy', sans-serif;
  font-weight: 300;
  font-size: 26px;
  line-height: 1.3em;
  color: #F6F5FF;
  margin-bottom: 30px;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Shiny gradient animation
const shineAnimation = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: linear-gradient(90deg, #4D6AFF 0%, #6A5AFF 100%);
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(77, 106, 255, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(77, 106, 255, 0.4);
  }
`;

// ScrollLink component that combines styled button with react-scroll
export const ScrollButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: linear-gradient(90deg, #4D6AFF 0%, #6A5AFF 100%);
  position: relative;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  overflow: hidden;
  
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(77, 106, 255, 0.5);
    &::before {
      animation: ${shineAnimation} 1.5s linear infinite;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(77, 106, 255, 0.5);
    &::before {
      animation: none;
    }
  }
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