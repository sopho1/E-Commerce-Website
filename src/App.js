import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import News from './components/News';
import Announcements from './components/Announcements';
import Gallery from './components/Gallery';
import Finance from './components/Finance';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { createGlobalStyle } from 'styled-components';
import { CartProvider } from './context/CartContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { lightTheme, darkTheme } from './theme';
import { ProductProvider } from './context/ProductContext';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    ${props => props.isDarkMode ? darkTheme : lightTheme}
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
    background: var(--background);
    color: var(--text);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  html {
    scroll-behavior: smooth;
  }
`;

const AppContent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <CartProvider>
      <ProductProvider>
        <GlobalStyle isDarkMode={isDarkMode} />
        <Navbar />
        <Hero />
        <Products />
        <About />
        <News />
        <Announcements />
        <Gallery />
        <Finance />
        <FAQ />
        <Contact />
        <Footer />
        <BackToTop />
      </ProductProvider>
    </CartProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App; 