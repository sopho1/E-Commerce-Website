import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { theme } from '../theme';

const GallerySection = styled.section`
  padding: 6rem 2rem;
  background: ${theme.colors.background};
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
  color: ${theme.colors.primary};
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;

  &:hover {
    .overlay {
      opacity: 1;
    }
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${GalleryItem}:hover & {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: ${theme.colors.white};
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.white};
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  padding: 1rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${theme.colors.secondary};
  }

  &.prev {
    left: 2rem;
  }

  &.next {
    right: 2rem;
  }
`;

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    title: "Aircraft Prototype 1"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Aircraft Prototype 2"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1581093458791-9d15482442f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Aircraft Prototype 3"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Aircraft Prototype 4"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    title: "Aircraft Prototype 5"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Aircraft Prototype 6"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;

    if (direction === 'next') {
      newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    }

    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <GallerySection id="gallery">
      <Container>
        <SectionTitle>Media Gallery</SectionTitle>
        <GalleryGrid>
          {galleryImages.map((image, index) => (
            <GalleryItem
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(image)}
            >
              <GalleryImage src={image.url} alt={image.title} />
              <Overlay className="overlay" />
            </GalleryItem>
          ))}
        </GalleryGrid>

        <AnimatePresence>
          {selectedImage && (
            <Lightbox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CloseButton onClick={closeLightbox}>
                <FaTimes />
              </CloseButton>
              <NavigationButton
                className="prev"
                onClick={() => navigateImage('prev')}
              >
                <FaChevronLeft />
              </NavigationButton>
              <LightboxImage src={selectedImage.url} alt={selectedImage.title} />
              <NavigationButton
                className="next"
                onClick={() => navigateImage('next')}
              >
                <FaChevronRight />
              </NavigationButton>
            </Lightbox>
          )}
        </AnimatePresence>
      </Container>
    </GallerySection>
  );
};

export default Gallery; 