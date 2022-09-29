import { Grid, Heading, Input } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gerenciador de Certificados</title>
        <meta
          name="description"
          content="Gerencie certificados de forma permanente e descentralizada"
        />
      </Head>

      <Grid as="main" padding="1rem">
        <Grid
          border="1px"
          borderColor="gray.200"
          borderRadius="8px"
          padding="1rem"
          gap="1rem"
        >
          <Heading size="md">Verificar certificado</Heading>
          <Input placeholder="Select Date and Time" size="md" type="file" />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
