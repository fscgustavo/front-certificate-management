import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { RegisterCertificate } from '../components/RegisterCertificate';
import { RevokeCertificate } from '../components/RevokeCertificate';

export default function University() {
  return (
    <Box as="main" padding="1rem" maxWidth="50rem" marginX="auto">
      <Tabs isFitted variant="enclosed" colorScheme="green">
        <TabList mb="1em">
          <Tab>Registrar certificado</Tab>
          <Tab>Revogar certificado</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RegisterCertificate />
          </TabPanel>
          <TabPanel>
            <RevokeCertificate />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
