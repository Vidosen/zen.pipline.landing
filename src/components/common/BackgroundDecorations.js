import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Container with animation capabilities
const DecorationsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transition: opacity 0.8s ease-in-out;
`;

// This is the main visual background element - large purple ellipse
const HeroEllipse = styled.div`
  position: absolute;
  top: -21px;
  left: 164px;
  width: 879px;
  height: 879px;
  border-radius: 50%;
  background-color: #221056;
  filter: blur(500px);
  z-index: 1;
  transition: transform 1.2s ease-out, opacity 1s ease-in-out;
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(-100px)'};
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

// Dark overlay to make content stand out
const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(17, 10, 39, 0.5);
  z-index: 1;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transition: opacity 1s ease-in-out;
`;

// Blur effect behind the Mac mini
const BlurEffect = styled.div`
  position: absolute;
  top: -236px;
  right: -350px;
  width: 800px;
  height: 800px;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(10px);
  }
  
  @media (max-width: 1400px) {
    right: -400px;
  }
  
  transition: transform 1.2s ease-out, opacity 1s ease-in-out;
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(-70px)'};
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

// The Mac mini device image - only use transform animation, no opacity change
const MacImage = styled.div`
  position: absolute;
  top: -28px;
  right: -200px;
  width: 800px;
  height: auto;
  z-index: 3;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  transition: transform 1s ease-out;
  transform: ${props => props.isVisible ? 'translateX(0)' : 'translateX(120px)'};
  opacity: 1; /* Always fully visible */
`;

// Additional decorative element in the top right
const HeroDecorativeElement = styled.div`
  position: absolute;
  top: -74px;
  left: 35%;
  width: 250px;
  height: 250px;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
  
  transition: transform 1.3s ease-out, opacity 1s ease-in-out;
  transform: ${props => props.isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(-40px) rotate(-10deg)'};
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

// The spiral image
const HeroGradientElement = styled.div`
  position: absolute;
  top: 435px;
  left: 20%;
  width: 500px;
  height: 500px;
  z-index: 4;
  
  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
  
  transition: transform 1.5s ease-out, opacity 1.3s ease-in-out;
  transform: ${props => props.isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(70px) rotate(10deg)'};
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

const BackgroundDecorations = ({ sectionId = "home" }) => {
  // Start with elements hidden for initial animation
  const [isVisible, setIsVisible] = useState(false);
  
  // Initial load animation
  useEffect(() => {
    // Short delay before showing the elements on page load
    const initialAnimationTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(initialAnimationTimer);
  }, []);
  
  // Scroll-based visibility
  useEffect(() => {
    const checkScroll = () => {
      // Get the hero section element
      const heroSection = document.getElementById('home');
      if (!heroSection) return;
      
      // Calculate visibility based on scroll position
      const heroRect = heroSection.getBoundingClientRect();
      const heroTop = heroRect.top;
      const heroHeight = heroRect.height;
      
      if (heroTop > -heroHeight + 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Run once on mount
    checkScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', checkScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
  
  return (
    <DecorationsContainer id={`${sectionId}-decorations`} isVisible={isVisible}>
      <DarkOverlay isVisible={isVisible} />
      <HeroEllipse isVisible={isVisible} />
      <BlurEffect isVisible={isVisible}>
        <img src="/images/hero-blur-1.png" alt="Blur effect" />
      </BlurEffect>
      
      <MacImage isVisible={isVisible}>
        <img src="/images/hero-mac.png" alt="Mac mini device" />
      </MacImage>
      
      <HeroDecorativeElement isVisible={isVisible}>
        <img src="/images/hero-gradient.png" alt="Decorative element" />
      </HeroDecorativeElement>
      
      <HeroGradientElement isVisible={isVisible}>
        <img src="/images/hero-element.png" alt="Gradient element" />
      </HeroGradientElement>
    </DecorationsContainer>
  );
};

export default BackgroundDecorations; 