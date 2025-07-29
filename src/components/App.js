import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Customers from './Customers';
import Features from './Features';
import Contact from './Contact';
import Footer from './Footer';

const AppContainer = styled.div`
  font-family: 'Gilroy', sans-serif;
  background-color: #110A27;
  color: #F6F5FF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <AppContainer>
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