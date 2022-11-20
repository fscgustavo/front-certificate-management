import { Button, Grid, Heading, Input } from '@chakra-ui/react';

export function VerifyCertificate() {
  return (
    <Grid as="main" padding="1rem">
      <Grid
        border="1px"
        borderColor="gray.200"
        borderRadius="8px"
        padding="1rem"
        gap="1rem"
      >
        <Heading size="md">Verificar certificado</Heading>
        <Input placeholder="Selecione o certificado" size="md" type="file" />
        <Button type="submit" colorScheme="green" width="100%">
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
}
