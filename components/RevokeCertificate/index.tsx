import { Button, Grid, Input, Text, Textarea } from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useWriteOperation } from '../../hooks/useWriteOperation';
import { Certificate } from '../../types';
import { getCertificateHash } from '../../utils/certificate';

export function RevokeCertificate() {
  const [certificate, setCertificate] = useState<Certificate>({
    hash: '',
    metadata: undefined,
    keywords: '',
  });

  const { isLoading, writeAsync } = useWriteOperation({
    functionName: 'revokeCertificate',
  });

  async function onChangeFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.currentTarget.files) {
      return;
    }

    const selectedCertificate = await getCertificateHash({
      files: event.currentTarget.files,
    });

    setCertificate(selectedCertificate);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { reason } = event.currentTarget;

    if (!certificate.hash || !reason.value) {
      return;
    }

    await writeAsync?.({
      recklesslySetUnpreparedArgs: [certificate.hash, reason.value],
    });

    alert('Certificado revogado');

    event.currentTarget.reset();
  }

  return (
    <Grid gap="1.5rem">
      <form onSubmit={onSubmit}>
        <Grid rowGap="1.5rem">
          <Grid rowGap="0.5rem">
            <Text htmlFor="certificateFile" as="label">
              Arquivo
            </Text>
            <Input
              id="certificateFile"
              name="certificateFile"
              placeholder="Selecione o certificado"
              size="md"
              type="file"
              required
              accept=".pdf"
              onChange={onChangeFile}
            />
            {certificate.hash && (
              <Text>ID do certificado: {certificate.hash}</Text>
            )}
          </Grid>
          <Grid rowGap="0.5rem">
            <Text htmlFor="reason" as="label">
              Motivo
            </Text>
            <Textarea id="reason" name="reason" required />
          </Grid>
          <Button
            type="submit"
            colorScheme="green"
            width="100%"
            isLoading={isLoading}
          >
            Revogar
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
