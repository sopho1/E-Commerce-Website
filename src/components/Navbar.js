import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlane, FaShoppingCart, FaSearch, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { theme } from '../theme';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';
import Cart from './Cart';
import Search from './Search';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? 'var(--white)' : 'transparent'};
  transition: all 0.3s ease;
  padding: 1rem 2rem;
  box-shadow: ${props => props.scrolled ? theme.shadows.medium : 'none'};
  display: ${props => props.isMobileMenuOpen ? 'none' : 'block'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${props => props.scrolled ? 'var(--primary)' : 'var(--white)'};
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--secondary);
    
    &::after {
      width: 100%;
    }
  }
`;

const NavIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.scrolled ? 'var(--primary)' : 'var(--white)'};
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--secondary);
    transform: scale(1.1);
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  opacity: 0.95;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const MobileNavLink = styled(motion.a)`
  color: ${theme.colors.white};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: ${theme.colors.secondary};
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.scrolled ? 'var(--primary)' : 'var(--white)'};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;

  &:hover {
    color: var(--secondary);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CartButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.scrolled ? 'var(--primary)' : 'var(--white)'};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;

  &:hover {
    color: var(--secondary);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--white);
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const { products } = useProducts();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Nav scrolled={scrolled} isMobileMenuOpen={isMobileMenuOpen}>
        <NavContainer>
          <Logo
            scrolled={scrolled}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaPlane />
            Air-Sopho
          </Logo>

          <NavLinks>
            <NavLink
              scrolled={scrolled}
              whileHover={{ scale: 1.1 }}
              href="#home"
            >
              Home
            </NavLink>
            <NavLink
              scrolled={scrolled}
              whileHover={{ scale: 1.1 }}
              href="#products"
            >
              Products
            </NavLink>
            <NavLink
              scrolled={scrolled}
              whileHover={{ scale: 1.1 }}
              href="#about"
            >
              About
            </NavLink>
            <NavLink
              scrolled={scrolled}
              whileHover={{ scale: 1.1 }}
              href="#contact"
            >
              Contact
            </NavLink>
          </NavLinks>

          <NavIcons>
            <MobileMenu>
              <IconButton
                scrolled={scrolled}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMobileMenuClick}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </IconButton>
            </MobileMenu>
          </NavIcons>

          <NavButtons>
            <ThemeToggle
              onClick={toggleTheme}
              scrolled={scrolled}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </ThemeToggle>
            <IconButton
              scrolled={scrolled}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
            >
              <FaSearch />
            </IconButton>
            <CartButton
              scrolled={scrolled}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              aria-label="View cart"
            >
              <FaShoppingCart />
              {cartItemsCount > 0 && (
                <CartCount>{cartItemsCount}</CartCount>
              )}
            </CartButton>
          </NavButtons>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MobileMenuHeader>
              <Logo scrolled={false}>
                <FaPlane />
                Air-Sopho
              </Logo>
              <IconButton
                scrolled={false}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMobileMenuClick}
              >
                <FaTimes />
              </IconButton>
            </MobileMenuHeader>
            <MobileMenuLinks>
              <MobileNavLink
                href="#home"
                onClick={handleMobileNavClick}
                whileHover={{ scale: 1.1 }}
              >
                Home
              </MobileNavLink>
              <MobileNavLink
                href="#products"
                onClick={handleMobileNavClick}
                whileHover={{ scale: 1.1 }}
              >
                Products
              </MobileNavLink>
              <MobileNavLink
                href="#about"
                onClick={handleMobileNavClick}
                whileHover={{ scale: 1.1 }}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                href="#contact"
                onClick={handleMobileNavClick}
                whileHover={{ scale: 1.1 }}
              >
                Contact
              </MobileNavLink>
            </MobileMenuLinks>
          </MobileMenuOverlay>
        )}
      </AnimatePresence>

      <Cart />
      <Search
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
      />
    </>
  );
};

export default Navbar; 