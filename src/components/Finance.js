import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaBitcoin, FaFileInvoiceDollar, FaChartLine, FaDownload } from 'react-icons/fa';
import { theme } from '../theme';

const FinanceSection = styled.section`
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

const FinanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const PaymentMethodCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: 15px;
  padding: 2rem;
  box-shadow: ${theme.shadows.medium};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.large};
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${theme.colors.secondary}20;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin: 0 auto 1.5rem;
`;

const PaymentTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
`;

const PaymentDescription = styled.p`
  color: ${theme.colors.gray};
  line-height: 1.6;
`;

const ReportsSection = styled.div`
  margin-top: 4rem;
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ReportCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: 15px;
  padding: 2rem;
  box-shadow: ${theme.shadows.medium};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.large};
  }
`;

const ReportHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ReportTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.primary};
`;

const ReportMeta = styled.div`
  color: ${theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const DownloadButton = styled(motion.a)`
  display: inline-flex;
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

const paymentMethods = [
  {
    id: 1,
    title: "Credit Cards",
    description: "We accept all major credit cards including Visa, MasterCard, and American Express.",
    icon: <FaCreditCard />
  },
  {
    id: 2,
    title: "PayPal",
    description: "Fast and secure payments through PayPal with buyer protection.",
    icon: <FaPaypal />
  },
  {
    id: 3,
    title: "Cryptocurrency",
    description: "Pay with Bitcoin and other major cryptocurrencies for enhanced privacy.",
    icon: <FaBitcoin />
  }
];

const financialReports = [
  {
    id: 1,
    title: "Annual Report 2023",
    date: "December 31, 2023",
    type: "PDF",
    size: "2.4 MB",
    icon: <FaFileInvoiceDollar />
  },
  {
    id: 2,
    title: "Q4 Financial Statement",
    date: "December 31, 2023",
    type: "PDF",
    size: "1.8 MB",
    icon: <FaChartLine />
  },
  {
    id: 3,
    title: "Investor Presentation",
    date: "January 15, 2024",
    type: "PDF",
    size: "3.2 MB",
    icon: <FaChartLine />
  }
];

const Finance = () => {
  return (
    <FinanceSection id="finance">
      <Container>
        <SectionTitle>Payment & Finance</SectionTitle>
        
        <FinanceGrid>
          {paymentMethods.map((method, index) => (
            <PaymentMethodCard
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <IconWrapper>{method.icon}</IconWrapper>
              <PaymentTitle>{method.title}</PaymentTitle>
              <PaymentDescription>{method.description}</PaymentDescription>
            </PaymentMethodCard>
          ))}
        </FinanceGrid>

        <ReportsSection>
          <SectionTitle>Financial Reports</SectionTitle>
          <ReportsGrid>
            {financialReports.map((report, index) => (
              <ReportCard
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ReportHeader>
                  <IconWrapper>{report.icon}</IconWrapper>
                  <ReportTitle>{report.title}</ReportTitle>
                </ReportHeader>
                <ReportMeta>
                  <div>Date: {report.date}</div>
                  <div>Type: {report.type}</div>
                  <div>Size: {report.size}</div>
                </ReportMeta>
                <DownloadButton
                  href="#"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload /> Download Report
                </DownloadButton>
              </ReportCard>
            ))}
          </ReportsGrid>
        </ReportsSection>
      </Container>
    </FinanceSection>
  );
};

export default Finance; 