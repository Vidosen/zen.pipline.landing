import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Container for hero decorations
const DecorationsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: visible;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transition: opacity 0.8s ease-in-out;
`;

// This is the main visual background element - large purple ellipse
const HeroEllipse = styled.div`
  position: absolute;
  top: -150px; /* Adjusted to overflow more visibly */
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

  @media (max-width: 768px) {
    top: -100px;
    right: -350px;
    width: 1000px;
  }
  

  transition: transform 1s ease-out;
  transform: ${props => props.isVisible ? 'translateX(0)' : 'translateX(120px)'};
  opacity: 1; /* Always fully visible */
`;

// Additional decorative element in the top right
const HeroDecorativeElement = styled.div`
  position: absolute;
  top: -250px;
  right: -100px;
  width: 600px;
  height: 600px;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
  
  transition: transform 1.2s ease-out, opacity 1s ease-in-out;
  transform: ${props => props.isVisible ? 'scale(1)' : 'scale(0.8)'};
  opacity: ${props => props.isVisible ? '0.8' : '0'};
`;

// Gradient element on the right
const HeroGradientElement = styled.div`
  position: absolute;
  top: 50px;
  right: -50px;
  width: 400px;
  height: 400px;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
  
  transition: transform 1.2s ease-out, opacity 1s ease-in-out;
  transform: ${props => props.isVisible ? 'rotate(0deg)' : 'rotate(15deg)'};
  opacity: ${props => props.isVisible ? '0.6' : '0'};
`;

// Mobile-only Frame 112 decoration from Figma
const MobileFrame112 = styled.div`
  position: absolute;
  top: 350px;
  left: -120px;
  width: 310px;
  height: 343px;
  z-index: 4;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  transition: transform 1.2s ease-out, opacity 1s ease-in-out;
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(50px)'};
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

// Blurred ellipse element within Frame 112
const Frame112Ellipse = styled.div`
  position: absolute;
  top: 287px;
  left: 112px;
  width: 188px;
  height: 66px;
  background-color: #797E81;
  border-radius: 50%;
  filter: blur(50px);
  z-index: 1;
`;

// Image element within Frame 112
const Frame112Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 310px;
  height: 310px;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(10px);
  }
`;

// Contact section decorations
const ContactImageContainer = styled.div`
  position: absolute;
  top: 20px;
  right: -150px;
  width: 400px;
  height: 600px;
  z-index: 1;
  border-radius: 20px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
  
  transition: transform 1.2s ease-out, opacity 1s ease-in-out;
  transform: ${props => props.isVisible ? 'translateX(0)' : 'translateX(100px)'};
  opacity: ${props => props.isVisible ? '0.8' : '0'};
`;

const HeroBackgroundDecorations = ({ sectionId = 'hero' }) => {
  const [isVisible, setIsVisible] = useState(true); // Start visible by default
  
  // Scroll-based visibility
  useEffect(() => {
    const checkScroll = () => {
      // Get the hero section element
      const heroSection = document.getElementById(sectionId);
      if (!heroSection) return;
      
      // Calculate visibility based on scroll position
      const rect = heroSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Show when any part of the section is in the viewport
      // or just slightly outside of it to account for overflow elements
      if (rect.bottom > -300 && rect.top < windowHeight + 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', checkScroll);
    
    // Initial check
    checkScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', checkScroll);
  }, [sectionId]);
  
  return (
    <DecorationsContainer id={`${sectionId}-decorations`} isVisible={isVisible}>
      <DarkOverlay isVisible={isVisible} />
      <HeroEllipse isVisible={isVisible} />
      <BlurEffect isVisible={isVisible}>
        <img src="/images/hero-blur-1.png" alt="Blur effect" loading="lazy" />
      </BlurEffect>
      
      <MacImage isVisible={isVisible}>
        <img src="/images/hero-mac.png" alt="Mac mini device" loading="lazy" />
      </MacImage>
      
      <HeroDecorativeElement isVisible={isVisible}>
        <img src="/images/hero-gradient.png" alt="Decorative element" loading="lazy" />
      </HeroDecorativeElement>
      
      <HeroGradientElement isVisible={isVisible}>
        <img src="/images/hero-element.png" alt="Gradient element" loading="lazy" />
      </HeroGradientElement>
      
      <MobileFrame112 isVisible={isVisible}>
        <Frame112Ellipse />
        <Frame112Image>
          <img src="/images/frame-112-decoration.png" alt="Frame 112 decoration" loading="lazy" />
        </Frame112Image>
      </MobileFrame112>
    </DecorationsContainer>
  );
};

// Separate component for Contact section decorations
export const ContactDecorations = () => {
  const [isVisible, setIsVisible] = useState(true); // Start visible by default
  
  // Scroll-based visibility
  useEffect(() => {
    const checkScroll = () => {
      // Get the contact section element
      const contactSection = document.getElementById('contact');
      if (!contactSection) return;
      
      // Calculate visibility based on scroll position
      const rect = contactSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Show when any part of the section is in the viewport
      // or just slightly outside of it to account for overflow elements
      if (rect.bottom > -300 && rect.top < windowHeight + 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', checkScroll);
    
    // Initial check
    checkScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
  
  return (
    <ContactImageContainer isVisible={isVisible}>
      <img src="/images/contact-image.jpg" alt="Contact us" loading="lazy" />
    </ContactImageContainer>
  );
};

export default HeroBackgroundDecorations; 