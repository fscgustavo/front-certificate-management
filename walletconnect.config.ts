import { chains } from '@web3modal/ethereum';
import { ConfigOptions } from '@web3modal/react';

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable');
}

export const walletConnectConfig: ConfigOptions = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  theme: 'light',
  accentColor: 'default',
  ethereum: {
    appName: 'web3Modal',
    chains: [chains.mainnet, chains.goerli],
  },
};
