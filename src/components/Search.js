import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const SearchContainer = styled(motion.div)`
  background: var(--background);
  border-radius: 1rem;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--light-gray);
`;

const SearchHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--background);
  color: var(--text);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;

  &:hover {
    color: var(--primary);
    background: var(--light-gray);
  }
`;

const ResultsContainer = styled.div`
  padding: 1.5rem;
`;

const ResultItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--light-gray);
  margin-bottom: 1rem;

  &:hover {
    background: var(--light-gray);
    transform: translateX(5px);
  }
`;

const ResultImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ResultContent = styled.div`
  flex: 1;
`;

const ResultTitle = styled.h3`
  color: var(--text);
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
`;

const ResultDescription = styled.p`
  color: var(--gray);
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
`;

const ResultPrice = styled.div`
  color: var(--primary);
  font-weight: 600;
  font-size: 1.1rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text);
`;

const Search = ({ isOpen, onClose, products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <SearchContainer
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <SearchHeader>
              <FaSearch style={{ color: 'var(--gray)' }} />
              <SearchInput
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <CloseButton
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close search"
              >
                <FaTimes />
              </CloseButton>
            </SearchHeader>

            <ResultsContainer>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ResultItem
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ResultImage src={product.image} alt={product.name} />
                    <ResultContent>
                      <ResultTitle>{product.name}</ResultTitle>
                      <ResultDescription>{product.description}</ResultDescription>
                      <ResultPrice>{product.price}</ResultPrice>
                    </ResultContent>
                  </ResultItem>
                ))
              ) : searchTerm.trim() !== '' ? (
                <NoResults>No products found</NoResults>
              ) : null}
            </ResultsContainer>
          </SearchContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Search; 