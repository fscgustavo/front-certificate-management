import type { NextPage } from 'next';
import Head from 'next/head';
import { VerifyCertificate } from '../components/VerifyCertificate';

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

      <VerifyCertificate />
    </>
  );
};

export default Home;
