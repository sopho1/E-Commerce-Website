import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import { theme } from '../theme';
import { useCart } from '../context/CartContext';
import PrototypeDetails from './PrototypeDetails';

const ProductsSection = styled.section`
  padding: 6rem 2rem;
  background: var(--background);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const ProductCard = styled(motion.div)`
  background: var(--white);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid var(--light-gray);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(13, 71, 161, 0.2);
    border-color: var(--primary);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--text);
`;

const ProductDescription = styled.p`
  color: var(--gray);
  font-size: 0.875rem;
  margin: 0 0 1rem;
  line-height: 1.5;
`;

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled(motion.button)`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const AddToCartButton = styled(Button)`
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: var(--white);
  
  &:hover {
    box-shadow: 0 4px 12px rgba(13, 71, 161, 0.3);
  }
`;

const DetailsButton = styled(Button)`
  background: var(--light-gray);
  color: var(--text);
  
  &:hover {
    background: var(--secondary);
    color: var(--white);
  }
`;

const products = [
  {
    id: 1,
    name: "SkyGlider X1",
    description: "Ultra-lightweight prototype with advanced aerodynamics",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
  },
  {
    id: 2,
    name: "AeroJet Pro",
    description: "High-performance jet prototype with cutting-edge technology",
    price: "$3,999",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    name: "HeliMaster H2",
    description: "Revolutionary helicopter prototype with enhanced stability",
    price: "$4,499",
    image: "https://images.unsplash.com/photo-1581093458791-9d15482442f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    name: "DroneX Elite",
    description: "Advanced drone prototype with AI capabilities",
    price: "$1,999",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 5,
    name: "SkyCruiser S1",
    description: "Luxury private jet prototype with premium features",
    price: "$5,999",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
  },
  {
    id: 6,
    name: "AeroGlider Pro",
    description: "High-efficiency glider prototype for long-range flights",
    price: "$3,499",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 7,
    name: "HeliMaster H3",
    description: "Next-generation helicopter with advanced controls",
    price: "$4,999",
    image: "https://images.unsplash.com/photo-1581093458791-9d15482442f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 8,
    name: "DroneX Pro",
    description: "Professional drone with 4K camera and extended range",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 9,
    name: "SkyRacer X2",
    description: "High-speed racing aircraft prototype",
    price: "$3,999",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
  },
  {
    id: 10,
    name: "AeroJet Elite",
    description: "Premium jet prototype with luxury interior",
    price: "$6,499",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 11,
    name: "HeliMaster H4",
    description: "Advanced helicopter with AI-assisted controls",
    price: "$5,499",
    image: "https://images.unsplash.com/photo-1581093458791-9d15482442f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 12,
    name: "DroneX Max",
    description: "Heavy-lift drone for commercial applications",
    price: "$3,999",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 13,
    name: "SkyGlider X2",
    description: "Enhanced version of our popular glider",
    price: "$2,999",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
  },
  {
    id: 14,
    name: "AeroJet Max",
    description: "Maximum performance jet prototype",
    price: "$7,499",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 15,
    name: "HeliMaster H5",
    description: "Ultimate helicopter prototype with advanced features",
    price: "$6,999",
    image: "https://images.unsplash.com/photo-1581093458791-9d15482442f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 16,
    name: "DroneX Ultra",
    description: "Ultra-high performance drone for professional use",
    price: "$4,499",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 17,
    name: "SkyCruiser S2",
    description: "Enhanced luxury private jet prototype",
    price: "$6,999",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
  },
  {
    id: 18,
    name: "AeroGlider Max",
    description: "Maximum range glider prototype",
    price: "$4,499",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 19,
    name: "HeliMaster H6",
    description: "Next-level helicopter with revolutionary design",
    price: "$7,499",
    image: "https://images.unsplash.com/photo-1581093458791-9d15482442f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 20,
    name: "DroneX Elite Pro",
    description: "Professional-grade drone with advanced features",
    price: "$5,999",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const Products = () => {
  const { addToCart } = useCart();
  const [selectedPrototype, setSelectedPrototype] = useState(null);

  const handleAddToCart = (prototype) => {
    addToCart(prototype);
  };

  const handleDetailsClick = (prototype) => {
    setSelectedPrototype(prototype);
  };

  const handleCloseDetails = () => {
    setSelectedPrototype(null);
  };

  return (
    <ProductsSection id="products">
      <Container>
        <SectionTitle>Our Prototypes</SectionTitle>
        <ProductGrid>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <ProductImage src={product.image} alt={product.name} />
              <ProductContent>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>{product.price}</ProductPrice>
                <ButtonGroup>
                  <AddToCartButton
                    onClick={() => handleAddToCart(product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </AddToCartButton>
                  <DetailsButton
                    onClick={() => handleDetailsClick(product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaInfoCircle />
                    Details
                  </DetailsButton>
                </ButtonGroup>
              </ProductContent>
            </ProductCard>
          ))}
        </ProductGrid>
      </Container>

      {selectedPrototype && (
        <PrototypeDetails
          prototype={selectedPrototype}
          onClose={handleCloseDetails}
        />
      )}
    </ProductsSection>
  );
};

export default Products; 