import { Spinner, Text } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useReadOperation } from '../../hooks/useReadOperation';
import { isInvalidAddress } from '../../utils';
import { RegisterCertificateForm } from '../RegisterCertificateForm';

export function RegisterCertificate() {
  const isMounted = useIsMounted();

  const { address: certifierAddress = '0x0' } = useAccount();

  const { data, isLoading } = useReadOperation({
    functionName: 'getUniversityOfCertifier',
    args: [certifierAddress],
    enabled: certifierAddress !== '0x0',
  });

  if (isLoading || !isMounted()) {
    return <Spinner display="block" marginX="auto" />;
  }

  if (isInvalidAddress(data as string)) {
    return <Text>Apenas certificadores podem registrar um certificado</Text>;
  }

  return (
    <RegisterCertificateForm
      certifierAddress={certifierAddress}
      universityOfCertifier={data}
    />
  );
}
