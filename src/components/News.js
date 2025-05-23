import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { theme } from '../theme';

const NewsSection = styled.section`
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

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const NewsCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.large};
  }
`;

const NewsImage = styled.div`
  height: 200px;
  background: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`;

const NewsContent = styled.div`
  padding: 1.5rem;
`;

const NewsDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const NewsTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const NewsExcerpt = styled.p`
  color: ${theme.colors.gray};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ReadMore = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.secondary};
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const newsItems = [
  {
    id: 1,
    title: "Revolutionary New Aircraft Design Unveiled",
    date: "March 15, 2024",
    excerpt: "Our team of engineers has developed a groundbreaking aircraft design that promises to revolutionize air travel efficiency.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
  },
  {
    id: 2,
    title: "AeroProto Wins Innovation Award",
    date: "March 10, 2024",
    excerpt: "We're proud to announce that AeroProto has been recognized with the prestigious Aviation Innovation Award for 2024.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "New Partnership with Major Airlines",
    date: "March 5, 2024",
    excerpt: "AeroProto has entered into a strategic partnership with leading airlines to develop next-generation aircraft.",
    image: "https://images.unsplash.com/photo-1581093458791-9d15482442f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const News = () => {
  return (
    <NewsSection id="news">
      <Container>
        <SectionTitle>Latest News</SectionTitle>
        <NewsGrid>
          {newsItems.map((news, index) => (
            <NewsCard
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <NewsImage image={news.image} />
              <NewsContent>
                <NewsDate>
                  <FaCalendarAlt />
                  {news.date}
                </NewsDate>
                <NewsTitle>{news.title}</NewsTitle>
                <NewsExcerpt>{news.excerpt}</NewsExcerpt>
                <ReadMore
                  href="#"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More <FaArrowRight />
                </ReadMore>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsGrid>
      </Container>
    </NewsSection>
  );
};

export default News; 