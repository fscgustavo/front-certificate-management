import { Button, Grid, Heading, Input, Text } from '@chakra-ui/react';
import { FormEvent, useRef, useState } from 'react';
import { useReadOperation } from '../../hooks/useReadOperation';
import { Certificate } from '../../types';
import { bigNumberToLocaleDateString, isInvalidAddress } from '../../utils';
import { getCertificateHash } from '../../utils/certificate';
import { UniversityInfo } from '../UniversityInfo';

export function VerifyCertificate() {
  const inputFileRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const [certificate, setCertificate] = useState<Certificate>({
    hash: '',
    metadata: undefined,
    keywords: '',
  });

  const {
    data: {
      data: [certifier, university, issueDate, expirationDate] = [],
      status: [isInvalid, revocationReason] = [],
    } = {},
    isLoading,
  } = useReadOperation({
    functionName: 'getCertificate',
    enabled: certificate.hash !== '',
    args: [certificate.hash],
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!inputFileRef.current.files) {
      return;
    }

    const certificate = await getCertificateHash({
      files: inputFileRef.current.files,
    });

    setCertificate(certificate);
  }

  return (
    <Grid as="main" padding="1rem" gap="1.25rem">
      <form onSubmit={onSubmit}>
        <Grid
          border="1px"
          borderColor="gray.200"
          borderRadius="8px"
          padding="1rem"
          gap="1rem"
        >
          <Heading size="md">Verificar certificado</Heading>
          <Input
            placeholder="Selecione o certificado"
            size="md"
            type="file"
            required
            accept=".pdf"
            ref={inputFileRef}
          />
          <Button
            type="submit"
            colorScheme="green"
            width="100%"
            isLoading={isLoading}
          >
            Enviar
          </Button>
        </Grid>
      </form>
      {certifier && (
        <>
          <Grid gap="0.5rem">
            <Text fontWeight="bold" fontSize="1.25rem">
              Texto gerador
            </Text>
            <Text>{JSON.stringify(certificate.metadata)}</Text>
            <Text>{certificate.keywords}</Text>
          </Grid>
          <Grid gap="0.5rem">
            <Text fontWeight="bold" fontSize="1.25rem">
              Dados obtidos
            </Text>
            {isInvalid ? (
              <>
                <Text color="red.500">Certificado inv??lido</Text>
                <Text>Motivo da revoga????o: {revocationReason}</Text>
              </>
            ) : (
              <Text color="green.400">Certificado v??lido</Text>
            )}
            <Text>ID do certificado: {certificate.hash}</Text>
            <Text>Certificador: {certifier}</Text>
            <Text>Universidade: {university}</Text>
            <Text>
              Data de emiss??o:{' '}
              {bigNumberToLocaleDateString(issueDate?.toNumber())}
            </Text>
            <Text>
              Data de expira????o:{' '}
              {bigNumberToLocaleDateString(expirationDate?.toNumber())}
            </Text>
          </Grid>
          {!isInvalidAddress(university) && (
            <UniversityInfo address={university} />
          )}
        </>
      )}
    </Grid>
  );
}
