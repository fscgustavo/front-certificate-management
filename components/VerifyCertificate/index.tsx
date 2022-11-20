import { Button, Grid, Heading, Input, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { PDFDocument } from 'pdf-lib';
import { FormEvent, useRef, useState } from 'react';
import { useReadOperation } from '../../hooks/useReadOperation';
import { MetadataStructure } from '../../types';
import { bigNumberToLocaleDateString, isInvalidAddress } from '../../utils';
import { UniversityInfo } from '../UniversityInfo';

async function getCertificateHash({ files }: { files: FileList }) {
  const certificateArrayBuffer = await files[0].arrayBuffer();

  const certificate = await PDFDocument.load(certificateArrayBuffer);

  const metadata = {
    title: certificate.getTitle() ?? '',
    author: certificate.getAuthor() ?? '',
    subject: certificate.getSubject() ?? '',
    creator: certificate.getCreator() ?? '',
    creationDate: certificate.getCreationDate() ?? new Date(0),
  };

  const keywords = certificate.getKeywords();

  const metadataString = JSON.stringify(metadata);

  const hash = ethers.utils.id(metadataString);

  console.log({ metadata, keywords, hash });

  return { metadata, keywords, hash };
}

type Certificate = {
  hash: string;
  metadata?: MetadataStructure;
  keywords?: string;
};

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
                <Text color="red.500">Certificado inválido</Text>
                <Text>{revocationReason}</Text>
              </>
            ) : (
              <Text color="green.400">Certificado válido</Text>
            )}
            <Text>ID do certificado: {certificate.hash}</Text>
            <Text>Certificador: {certifier}</Text>
            <Text>Universidade: {university}</Text>
            <Text>
              Data de emissão:{' '}
              {bigNumberToLocaleDateString(issueDate?.toNumber())}
            </Text>
            <Text>
              Data de expiração:{' '}
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
