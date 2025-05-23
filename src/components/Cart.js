import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { theme } from '../theme';
import Checkout from './Checkout';

const CartOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.large};
  z-index: 1000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CartTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.primary};
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.gray};
  cursor: pointer;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 2rem;
`;

const CartItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${theme.colors.lightGray};
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  color: ${theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.div`
  color: ${theme.colors.secondary};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled(motion.button)`
  background: ${theme.colors.lightGray};
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: ${theme.colors.gray};
    color: ${theme.colors.white};
  }
`;

const Quantity = styled.span`
  font-weight: 500;
`;

const RemoveButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${theme.colors.gray};
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: ${theme.colors.accent};
  }
`;

const CartFooter = styled.div`
  border-top: 1px solid ${theme.colors.lightGray};
  padding-top: 1rem;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  
  &:hover {
    background: ${theme.colors.secondary};
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  color: ${theme.colors.gray};
  padding: 2rem 0;
`;

const Cart = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <CartOverlay
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <CartHeader>
              <CartTitle>Shopping Cart</CartTitle>
              <CloseButton
                onClick={() => setIsCartOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </CloseButton>
            </CartHeader>

            <CartItems>
              {cart.length === 0 ? (
                <EmptyCart>Your cart is empty</EmptyCart>
              ) : (
                cart.map((item) => (
                  <CartItem
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ItemImage image={item.image} />
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>{item.price}</ItemPrice>
                      <QuantityControls>
                        <QuantityButton
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaMinus />
                        </QuantityButton>
                        <Quantity>{item.quantity}</Quantity>
                        <QuantityButton
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaPlus />
                        </QuantityButton>
                      </QuantityControls>
                    </ItemDetails>
                    <RemoveButton
                      onClick={() => removeFromCart(item.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash />
                    </RemoveButton>
                  </CartItem>
                ))
              )}
            </CartItems>

            <CartFooter>
              <Total>
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </Total>
              <CheckoutButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsCheckoutOpen(true);
                  setIsCartOpen(false);
                }}
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </CheckoutButton>
            </CartFooter>
          </CartOverlay>
        )}
      </AnimatePresence>

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};

export default Cart; 