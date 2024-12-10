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
  ListItem,
} from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h1" size="xl" mb={6} fontSize="2xl">Privacy Policy</Heading>
      <Text fontSize="sm" color="gray.600" mb={4}>Last Updated: 10 December, 2024</Text>
      <Text mb={6} fontSize="lg" lineHeight="1.8">
        At Gharsetu (accessible at www.gharsetu.com), we are committed to respecting your privacy and ensuring the protection of your personal information. This Privacy Policy outlines how we collect, use, share, and safeguard your information. By using our website or any related services, you agree to the terms of this Privacy Policy.
      </Text>

      {/* defaultIndex={[0]} ensures the first accordion item is open by default */}
      <Accordion allowMultiple defaultIndex={[0]}>
        
        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                1. Information We Collect
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            <Text mb={4}>
              <strong>1.1 Personal Information:</strong> We may collect personal information you voluntarily provide, such as your name, email address, phone number, property preferences, and other details when you register, submit an inquiry, post a listing, or subscribe to our newsletter.
            </Text>
            <Text mb={4}>
              <strong>1.2 Automatically Collected Information:</strong> When you visit or use our website, we may automatically collect certain information through cookies and similar technologies. This may include your IP address, browser type, operating system, referring URLs, and how you interact with our website.
            </Text>
            <Text>
              <strong>1.3 Cookies and Similar Technologies:</strong> We use cookies and other tracking technologies to enhance your browsing experience, analyze site traffic, personalize content, and serve targeted advertisements. You can control cookie preferences through your browser settings.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                2. How We Use Your Information
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            <Text mb={4}>
              <strong>2.1 To Provide and Improve Services:</strong> We use the information we collect to facilitate property searches, connect you with sellers or agents, respond to inquiries, improve the website’s performance, and develop new features.
            </Text>
            <Text mb={4}>
              <strong>2.2 Communications:</strong> We may use your contact information to send you updates, newsletters, marketing materials, and service-related messages. You can opt out of marketing communications at any time by following the unsubscribe link or contacting us directly.
            </Text>
            <Text>
              <strong>2.3 Compliance and Legal Obligations:</strong> We may use or disclose your information if required by law, legal proceedings, government authorities, or to enforce our Terms & Conditions, protect our rights, property, or safety and that of other users.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                3. Sharing Your Information
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            <Text mb={4}><strong>3.1 With Service Providers:</strong> We may share your personal information with trusted third-party service providers who help us operate and maintain our website, process transactions, or provide other essential services.</Text>
            <Text mb={4}><strong>3.2 With Sellers and Agents:</strong> If you express interest in a particular listing, we may share your contact information with the seller or their authorized agent to facilitate communication and potentially complete a transaction.</Text>
            <Text><strong>3.3 Business Transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of the business transaction.</Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                4. Data Security
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. While we strive to safeguard your data, no online transmission or storage method is entirely secure, and we cannot guarantee absolute security.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                5. Your Rights and Choices
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            <Text mb={4}><strong>5.1 Access and Correction:</strong> You may review, update, or correct your personal information by logging into your account or contacting us.</Text>
            <Text><strong>5.2 Deletion and Restriction:</strong> Subject to applicable law, you may request the deletion or restriction of your personal data. We will make reasonable efforts to comply, unless legally required or we have legitimate grounds to retain it.</Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                6. Third-Party Links
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. Review their privacy policies before providing any personal information.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                7. Children’s Privacy
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            Our website is not directed at individuals under 18. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal information, please contact us to have it removed.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                8. Changes to This Privacy Policy
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            We may update this Privacy Policy from time to time. Any changes will be posted here with a new “Last Updated” date. Continued use after changes are posted constitutes acceptance of the updated policy.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
                9. Contact Us
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize="md" lineHeight="1.8">
            If you have any questions or concerns about our Privacy Policy or data practices, please contact us at:
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

export default PrivacyPolicy;
