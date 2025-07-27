import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Customers from './Customers';
import Features from './Features';
import Contact from './Contact';
import Footer from './Footer';
import BackgroundDecorations from './common/BackgroundDecorations';

const AppContainer = styled.div`
  font-family: 'Gilroy', sans-serif;
  background-color: #110A27;
  color: #F6F5FF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
`;

// Background decorations wrapper that positions decorations relative to the viewport
const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: visible;
  pointer-events: none;
  z-index: 0;
`;

function App() {
  return (
    <AppContainer>
      {/* Background decorations positioned absolutely to the viewport */}
      <BackgroundWrapper>
        <BackgroundDecorations sectionId="app" />
      </BackgroundWrapper>
      
      <Header />
      <MainContent>
        <Hero />
        <About />
        <Customers />
        <Features />
        <Contact />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App; 