import { chains, providers } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { ComponentProps } from 'react';

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable');
}

type ConfigOptions = ComponentProps<typeof Web3Modal>['config'];

export const walletConnectConfig: ConfigOptions = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  theme: 'light',
  accentColor: 'default',
  ethereum: {
    appName: 'web3Modal',
    autoConnect: true,
    chains: [chains.goerli],
    providers: [
      providers.walletConnectProvider({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      }),
    ],
  },
};
