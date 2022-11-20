import { useContractRead, useNetwork } from 'wagmi';
import networkMapping from '../constants/networkMapping.json';
import certificateManagementABI from '../constants/CertificateManagement.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- no access to the types :(
export function useReadOperation(props: any) {
  const { chain } = useNetwork();

  const chainId = chain?.id ?? '31337';

  const address =
    networkMapping[chainId as keyof typeof networkMapping]
      .CertificateManagement[0];

  return useContractRead({
    address,
    abi: certificateManagementABI,
    ...props,
  });
}
