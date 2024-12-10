import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';

const TermsOfUse = () => {
  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h1" size="xl" mb={6} fontSize="2xl">Terms & Conditions</Heading>
      <Text fontSize="sm" color="gray.600" mb={4}>Last Updated: 10 December, 2024</Text>
      <Text mb={6} fontSize="lg" lineHeight="1.8">
        These Terms & Conditions (“Terms”) govern your use of Gharsetu (accessible at www.gharsetu.com) and any services provided through our platform. By accessing or using the website, you agree to be bound by these Terms. If you do not agree, please discontinue using our services.
      </Text>

      {/* defaultIndex={[0]} ensures the first accordion item is open by default */}
      <Accordion allowMultiple defaultIndex={[0]}>
        
        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                1. Scope of Services
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            Gharsetu is an Indian real estate marketplace that provides premium property listings and related information to assist homebuyers, investors, and sellers. We do not own, buy, or sell property directly. Any transactions initiated through our platform are conducted between the property owner (seller) and the prospective buyer or tenant.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                2. User Eligibility
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            You must be at least 18 years old and capable of entering into a legally binding agreement to use our website and services. By using Gharsetu, you represent and warrant that you meet these requirements.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                3. User Accounts
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            <Text mb={4}><strong>3.1 Registration:</strong> To access certain features, you may be required to create an account. You agree to provide accurate, current, and complete information during registration and to update it as necessary.</Text>
            <Text><strong>3.2 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately if you suspect unauthorized use of your account.</Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                4. Property Listings and Content
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            <Text mb={4}><strong>4.1 Accuracy of Listings:</strong> While we strive for accuracy, we cannot guarantee that all listings or information are complete, up-to-date, or error-free. Verify details independently before making decisions.</Text>
            <Text><strong>4.2 User-Generated Content:</strong> By posting reviews or other content, you grant Gharsetu a non-exclusive, royalty-free, transferable license to use it. You agree not to post unlawful, fraudulent, defamatory, or infringing content.</Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                5. Intellectual Property Rights
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            All content, trademarks, and intellectual property displayed on Gharsetu are owned by or licensed to us. You agree not to reproduce, distribute, modify, or create derivative works without our express written permission.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                6. Limitations of Liability
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            <Text mb={4}><strong>6.1 No Warranty:</strong> Gharsetu is provided on an “as-is” and “as-available” basis. We do not warrant that our services will meet your requirements or be error-free.</Text>
            <Text><strong>6.2 Limitation of Liability:</strong> To the fullest extent permitted by law, we will not be liable for any direct, indirect, incidental, consequential, or special damages arising from your use of Gharsetu.</Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                7. Indemnification
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            You agree to indemnify and hold Gharsetu and its affiliates, officers, agents, and employees harmless from any claims, damages, or expenses arising out of your use of the website, breach of these Terms, or violation of any law or third-party rights.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                8. External Links
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            Gharsetu may contain links to third-party websites. These links are provided for convenience, and we do not endorse or assume responsibility for their content or services.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                9. Modification and Termination
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            We may modify these Terms at any time. Updated Terms will be posted with a new “Last Updated” date. Your continued use after changes are posted constitutes acceptance. We may also suspend or discontinue our services at any time.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                10. Governing Law and Jurisdiction
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in [City/State], India.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                11. Contact Us
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            If you have any questions about these Terms & Conditions, please contact us at:
            <UnorderedList mt={2} ml={5}>
              <ListItem>Email: team@gharsetu.com</ListItem>
              <ListItem>Address: Kavi Nagar, Ghaziabad, Uttar Pradesh, India</ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default TermsOfUse;
