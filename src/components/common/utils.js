import styled from 'styled-components';

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

export const Button = styled.button`
  background-color: #385EFF;
  position: relative;
  border-radius: 20px;
  padding: 20px 30px;
  color: white;
  font-family: 'Gilroy', sans-serif;
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    background: #5E7DFE;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
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
  }
`;

export const Section = styled.section`
  padding: 120px 0;
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
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