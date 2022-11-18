import { useContractRead, useNetwork } from '@web3modal/react';
import type { ContractCtrlReadArgs } from '@web3modal/core';
import networkMapping from '../constants/networkMapping.json';
import certificateManagementABI from '../constants/CertificateManagement.json';

export function useReadOperation(props: ContractCtrlReadArgs) {
  const { network } = useNetwork();

  const chainId = network?.chain?.id.toString() ?? '31337';

  const address =
    networkMapping[chainId as keyof typeof networkMapping]
      .CertificateManagement[0];

  return useContractRead({
    address,
    abi: certificateManagementABI,
    ...props,
  });
}
