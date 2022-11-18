import { useContractWrite, useNetwork } from '@web3modal/react';
import type { ContractCtrlWriteArgs } from '@web3modal/core';
import networkMapping from '../constants/networkMapping.json';
import certificateManagementABI from '../constants/CertificateManagement.json';

export function useReadOperation(props: ContractCtrlWriteArgs) {
  const { network } = useNetwork();

  const chainId = network?.chain?.id.toString() ?? '31337';

  const address =
    networkMapping[chainId as keyof typeof networkMapping]
      .CertificateManagement[0];

  return useContractWrite({
    address,
    abi: certificateManagementABI,
    ...props,
  });
}
