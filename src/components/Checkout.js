import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { theme } from '../theme';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_publishable_key'); // Replace with your Stripe publishable key

const CheckoutOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const CheckoutContainer = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: 15px;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
`;

const CheckoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CheckoutTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.primary};
`;

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${theme.colors.gray};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const OrderSummary = styled.div`
  margin-bottom: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid ${theme.colors.lightGray};
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid ${theme.colors.lightGray};
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CardContainer = styled.div`
  padding: 1rem;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 8px;
  background: ${theme.colors.white};
`;

const PayButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background: ${theme.colors.secondary};
  }
`;

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.gray};
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const CheckoutForm = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Here you would typically make an API call to your backend
      // to process the payment with the paymentMethod.id
      console.log('Payment successful:', paymentMethod);
      
      // Clear cart and close checkout
      clearCart();
      onClose();
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <CheckoutContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <CheckoutHeader>
        <CheckoutTitle>Checkout</CheckoutTitle>
        <BackButton
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back
        </BackButton>
      </CheckoutHeader>

      <OrderSummary>
        {cart.map((item) => (
          <OrderItem key={item.id}>
            <span>{item.name} x {item.quantity}</span>
            <span>${(parseFloat(item.price.replace('$', '').replace(',', '')) * item.quantity).toFixed(2)}</span>
          </OrderItem>
        ))}
        <OrderTotal>
          <span>Total:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </OrderTotal>
      </OrderSummary>

      <PaymentForm onSubmit={handleSubmit}>
        <CardContainer>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: theme.colors.text,
                  '::placeholder': {
                    color: theme.colors.gray,
                  },
                },
              },
            }}
          />
        </CardContainer>

        {error && (
          <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
        )}

        <PayButton
          type="submit"
          disabled={!stripe || isProcessing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </PayButton>

        <SecurityNote>
          <FaLock /> Your payment information is secure and encrypted
        </SecurityNote>
      </PaymentForm>
    </CheckoutContainer>
  );
};

const Checkout = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <CheckoutOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Elements stripe={stripePromise}>
            <CheckoutForm onClose={onClose} />
          </Elements>
        </CheckoutOverlay>
      )}
    </AnimatePresence>
  );
};

export default Checkout; 