import { ChakraProvider } from '@chakra-ui/react';
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import type { AppProps } from 'next/app';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { theme } from '../chakra.theme';
import { Main } from '../components/Main';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? '';
const chains = [chain.goerli, chain.localhost];

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    appName: 'web3Modal',
    chains,
  }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3Modal
        projectId={projectId}
        theme="dark"
        accentColor="default"
        ethereumClient={ethereumClient}
      />
      <WagmiConfig client={wagmiClient}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
