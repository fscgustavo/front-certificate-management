import { Spinner, Text } from '@chakra-ui/react';
import { useAccount } from '@web3modal/react';
import { useReadOperation } from '../../hooks/useReadOperation';
import { isInvalidAddress } from '../../utils';
import { RegisterCertificateForm } from '../RegisterCertificateForm';

export function RegisterCertificate() {
  const {
    account: { address: certifierAddress },
  } = useAccount();

  const { data, isLoading } = useReadOperation({
    functionName: 'getUniversityOfCertifier',
    args: [certifierAddress],
  });

  if (isLoading) {
    return <Spinner display="block" marginX="auto" />;
  }

  if (isInvalidAddress(data as string)) {
    return <Text>Apenas certificadores podem registrar um certificado</Text>;
  }

  return (
    <RegisterCertificateForm
      certifierAddress={certifierAddress}
      universityOfCertifier={data as string}
    />
  );
}
