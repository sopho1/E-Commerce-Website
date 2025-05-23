import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBullhorn, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { theme } from '../theme';

const AnnouncementsSection = styled.section`
  padding: 6rem 2rem;
  background: ${theme.colors.lightGray};
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

const AnnouncementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const AnnouncementCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: 15px;
  padding: 2rem;
  box-shadow: ${theme.shadows.medium};
  transition: all 0.3s ease;
  border-left: 4px solid ${theme.colors.secondary};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.large};
  }
`;

const AnnouncementHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  background: ${theme.colors.secondary}20;
  color: ${theme.colors.secondary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const AnnouncementTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const AnnouncementContent = styled.p`
  color: ${theme.colors.gray};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const AnnouncementMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: ${theme.colors.gray};
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const announcements = [
  {
    id: 1,
    title: "Annual Aviation Conference 2024",
    content: "Join us at the upcoming Aviation Conference where we'll showcase our latest innovations and network with industry leaders.",
    date: "April 15-17, 2024",
    time: "9:00 AM - 5:00 PM",
    icon: <FaBullhorn />
  },
  {
    id: 2,
    title: "New Product Launch Event",
    content: "We're excited to announce the launch of our revolutionary new aircraft prototype. Join us for the unveiling ceremony.",
    date: "April 20, 2024",
    time: "2:00 PM - 4:00 PM",
    icon: <FaBullhorn />
  },
  {
    id: 3,
    title: "Open House Day",
    content: "Visit our state-of-the-art facility and get a behind-the-scenes look at our manufacturing process and latest prototypes.",
    date: "April 25, 2024",
    time: "10:00 AM - 3:00 PM",
    icon: <FaBullhorn />
  }
];

const Announcements = () => {
  return (
    <AnnouncementsSection id="announcements">
      <Container>
        <SectionTitle>Announcements</SectionTitle>
        <AnnouncementsGrid>
          {announcements.map((announcement, index) => (
            <AnnouncementCard
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AnnouncementHeader>
                <IconWrapper>{announcement.icon}</IconWrapper>
                <AnnouncementTitle>{announcement.title}</AnnouncementTitle>
              </AnnouncementHeader>
              <AnnouncementContent>{announcement.content}</AnnouncementContent>
              <AnnouncementMeta>
                <MetaItem>
                  <FaCalendarAlt />
                  {announcement.date}
                </MetaItem>
                <MetaItem>
                  <FaClock />
                  {announcement.time}
                </MetaItem>
              </AnnouncementMeta>
            </AnnouncementCard>
          ))}
        </AnnouncementsGrid>
      </Container>
    </AnnouncementsSection>
  );
};

export default Announcements; 