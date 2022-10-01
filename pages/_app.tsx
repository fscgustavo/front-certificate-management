import { ChakraProvider } from '@chakra-ui/react';
import { Web3ModalProvider } from '@web3modal/react';
import type { AppProps } from 'next/app';
import { theme } from '../chakra.theme';
import { Main } from '../components/Main';
import { walletConnectConfig } from '../walletconnect.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3ModalProvider config={walletConnectConfig}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </Web3ModalProvider>
    </ChakraProvider>
  );
}

export default MyApp;
