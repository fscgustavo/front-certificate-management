import { ChakraProvider } from '@chakra-ui/react';
import { Web3Modal } from '@web3modal/react';
import type { AppProps } from 'next/app';
import { theme } from '../chakra.theme';
import { Main } from '../components/Main';
import { walletConnectConfig } from '../walletconnect.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3Modal config={walletConnectConfig} />
      <Main>
        <Component {...pageProps} />
      </Main>
    </ChakraProvider>
  );
}

export default MyApp;
