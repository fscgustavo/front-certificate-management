import { useNetwork } from '@web3modal/react';
import networkMapping from '../constants/networkMapping.json';

export function useContractAddress() {
  const { network } = useNetwork();

  const chainId = network?.chain?.id.toString() ?? '31337';

  const address =
    networkMapping[chainId as keyof typeof networkMapping]
      .CertificateManagement[0];

  return {
    contractAddress: address,
  };
}
