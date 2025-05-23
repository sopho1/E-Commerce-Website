import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

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

const Modal = styled(motion.div)`
  background: var(--white);
  border-radius: 1rem;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(13, 71, 161, 0.2), 0 10px 10px -5px rgba(13, 71, 161, 0.1);
  border: 1px solid var(--light-gray);
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: var(--light-gray);
    color: var(--primary);
    transform: rotate(90deg);
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(13, 71, 161, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
`;

const Description = styled.p`
  color: var(--text);
  line-height: 1.6;
  margin: 0;
`;

const SpecsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: var(--light-gray);
  padding: 1.5rem;
  border-radius: 0.5rem;
`;

const SpecItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SpecLabel = styled.span`
  font-size: 0.875rem;
  color: var(--gray);
`;

const SpecValue = styled.span`
  font-weight: 500;
  color: var(--text);
`;

const AddToCartButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: var(--white);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 71, 161, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PrototypeDetails = ({ prototype, onClose }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(prototype);
    onClose();
  };

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Modal
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <CloseButton
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTimes />
          </CloseButton>

          <Content>
            <ImageSection>
              <Image src={prototype.image} alt={prototype.name} />
            </ImageSection>

            <DetailsSection>
              <Title>{prototype.name}</Title>
              <Price>{prototype.price}</Price>
              <Description>{prototype.description}</Description>

              <SpecsList>
                <SpecItem>
                  <SpecLabel>Type</SpecLabel>
                  <SpecValue>{prototype.type}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecLabel>Range</SpecLabel>
                  <SpecValue>{prototype.range}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecLabel>Speed</SpecLabel>
                  <SpecValue>{prototype.speed}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecLabel>Capacity</SpecLabel>
                  <SpecValue>{prototype.capacity}</SpecValue>
                </SpecItem>
              </SpecsList>

              <AddToCartButton
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaShoppingCart />
                Add to Cart
              </AddToCartButton>
            </DetailsSection>
          </Content>
        </Modal>
      </Overlay>
    </AnimatePresence>
  );
};

export default PrototypeDetails; 