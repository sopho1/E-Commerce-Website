import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRocket, FaCogs, FaUsers, FaAward } from 'react-icons/fa';
import { theme } from '../theme';

const AboutSection = styled.section`
  padding: 6rem 2rem;
  background: ${theme.colors.lightGray};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  color: ${theme.colors.secondary};
  text-align: center;
  margin: 4rem 0 2rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(motion.div)`
  background: ${theme.colors.white};
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: ${theme.shadows.medium};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${theme.colors.white};
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: ${theme.shadows.medium};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
`;

const Number = styled(motion.div)`
  font-size: 3rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.secondary};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${theme.colors.gray};
  line-height: 1.6;
`;

const useCounter = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return [count, ref];
};

const features = [
  {
    icon: <FaRocket />,
    title: "Innovation",
    description: "Pushing the boundaries of aerospace technology with cutting-edge designs"
  },
  {
    icon: <FaCogs />,
    title: "Engineering",
    description: "Precision engineering and advanced manufacturing techniques"
  },
  {
    icon: <FaUsers />,
    title: "Expert Team",
    description: "World-class engineers and designers with decades of experience"
  },
  {
    icon: <FaAward />,
    title: "Quality",
    description: "Rigorous testing and quality control for every prototype"
  }
];

const About = () => {
  const stats = [
    {
      number: 50,
      title: 'Years of Experience',
      description: 'Decades of expertise in aircraft design and manufacturing',
    },
    {
      number: 1000,
      title: 'Models Sold',
      description: 'Successfully delivered to aviation enthusiasts worldwide',
    },
    {
      number: 25,
      title: 'Awards Won',
      description: 'Recognized for innovation and excellence in aviation',
    },
    {
      number: 15,
      title: 'Countries Served',
      description: 'Global presence with satisfied customers worldwide',
    },
  ];

  // Create refs and counters for each stat
  const [count1, ref1] = useCounter(stats[0].number);
  const [count2, ref2] = useCounter(stats[1].number);
  const [count3, ref3] = useCounter(stats[2].number);
  const [count4, ref4] = useCounter(stats[3].number);

  const counters = [
    [count1, ref1],
    [count2, ref2],
    [count3, ref3],
    [count4, ref4],
  ];

  return (
    <AboutSection id="about">
      <Container>
        <Title>About Us</Title>
        
        <CardsContainer>
          {stats.map((stat, index) => {
            const [count, ref] = counters[index];
            return (
              <Card
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              >
                <Number>{count}+</Number>
                <CardTitle>{stat.title}</CardTitle>
                <Description>{stat.description}</Description>
              </Card>
            );
          })}
        </CardsContainer>

        <SectionTitle>Our Core Values</SectionTitle>
        <CardsContainer>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <CardTitle>{feature.title}</CardTitle>
              <Description>{feature.description}</Description>
            </FeatureCard>
          ))}
        </CardsContainer>
      </Container>
    </AboutSection>
  );
};

export default About; 