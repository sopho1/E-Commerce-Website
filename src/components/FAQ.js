import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { theme } from '../theme';

const FAQSection = styled.section`
  padding: 6rem 2rem;
  background: ${theme.colors.background};
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${theme.colors.primary};
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  border-radius: 10px;
  overflow: hidden;
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.small};
`;

const Question = styled.button`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${theme.colors.primary};
  text-align: left;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

const Icon = styled(motion.div)`
  color: ${theme.colors.secondary};
`;

const Answer = styled(motion.div)`
  padding: 0 1.5rem;
  color: ${theme.colors.gray};
  line-height: 1.6;
`;

const faqs = [
  {
    question: "What makes your prototypes unique?",
    answer: "Our prototypes combine cutting-edge technology with innovative design principles. We use advanced materials and manufacturing techniques to create lightweight, efficient, and high-performance aircraft models that push the boundaries of what's possible in aerospace engineering."
  },
  {
    question: "How long does it take to receive a prototype?",
    answer: "Delivery times vary depending on the complexity of the prototype and current demand. Typically, standard prototypes are delivered within 4-6 weeks, while custom designs may take 8-12 weeks. We'll provide you with a detailed timeline during the consultation process."
  },
  {
    question: "Do you offer customization options?",
    answer: "Yes, we offer extensive customization options for all our prototypes. From material selection to specific features and capabilities, we work closely with clients to ensure the final product meets their exact requirements and specifications."
  },
  {
    question: "What kind of support do you provide after purchase?",
    answer: "We provide comprehensive support including technical documentation, maintenance guides, and direct access to our engineering team. We also offer training sessions and regular updates on new features or improvements that can be applied to your prototype."
  },
  {
    question: "Are your prototypes suitable for commercial use?",
    answer: "Yes, our prototypes are designed to meet commercial standards and can be used for various applications including research, development, and commercial operations. We ensure all our products comply with relevant aviation regulations and safety standards."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FAQSection id="faq">
      <Container>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <Question onClick={() => toggleFAQ(index)}>
              {faq.question}
              <Icon
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown />
              </Icon>
            </Question>
            <AnimatePresence>
              {activeIndex === index && (
                <Answer
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p style={{ padding: "1.5rem 0" }}>{faq.answer}</p>
                </Answer>
              )}
            </AnimatePresence>
          </FAQItem>
        ))}
      </Container>
    </FAQSection>
  );
};

export default FAQ; 