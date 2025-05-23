import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlane, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { theme } from '../theme';

const FooterSection = styled.footer`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 4rem 2rem 2rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ColumnTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${theme.colors.accent};
`;

const FooterLink = styled.a`
  color: ${theme.colors.white};
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    color: ${theme.colors.secondary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  color: ${theme.colors.white};
  font-size: 1.5rem;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    color: ${theme.colors.secondary};
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  opacity: 0.8;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterSection>
      <Container>
        <FooterGrid>
          <FooterColumn>
            <Logo>
              <FaPlane />
              AeroProto
            </Logo>
            <p style={{ opacity: 0.8 }}>
              Innovating the future of aviation with cutting-edge prototypes and designs.
            </p>
            <SocialLinks>
              <SocialIcon
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebook />
              </SocialIcon>
              <SocialIcon
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter />
              </SocialIcon>
              <SocialIcon
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram />
              </SocialIcon>
              <SocialIcon
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin />
              </SocialIcon>
            </SocialLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Quick Links</ColumnTitle>
            <FooterLink href="#home">Home</FooterLink>
            <FooterLink href="#products">Products</FooterLink>
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Products</ColumnTitle>
            <FooterLink href="#">SkyGlider X1</FooterLink>
            <FooterLink href="#">AeroJet Pro</FooterLink>
            <FooterLink href="#">HeliMaster H2</FooterLink>
            <FooterLink href="#">DroneX Elite</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Support</ColumnTitle>
            <FooterLink href="#">FAQ</FooterLink>
            <FooterLink href="#">Shipping</FooterLink>
            <FooterLink href="#">Returns</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
          </FooterColumn>
        </FooterGrid>

        <BottomBar>
          © {new Date().getFullYear()} AeroProto. All rights reserved.
        </BottomBar>
      </Container>
    </FooterSection>
  );
};

export default Footer; 