import styled, { keyframes } from 'styled-components';
import { Link } from 'react-scroll';

// Shiny gradient animation
const shineAnimation = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

// Hero section shiny button with scroll functionality
const ShinyButton = styled(Link)`
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
  
  @media (max-width: 768px) {
    width: 240px;
    height: 40px;
    padding: 10px 20px;
    font-size: 16px;
    
    &::after {
      height: 20px;
      border-radius: 0 0 30px 30px;
    }
  }
`;

export default ShinyButton; 