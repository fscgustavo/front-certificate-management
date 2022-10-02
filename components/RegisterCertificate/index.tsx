import { Button, Flex, Grid, Input, Text } from '@chakra-ui/react';

export function RegisterCertificate() {
  return (
    <Grid rowGap="1.5rem" as="form">
      <Grid rowGap="1rem">
        <Grid rowGap="0.5rem">
          <Text htmlFor="certificate" as="label">
            Arquivo
          </Text>
          <Input
            id="certificate"
            type="file"
            placeholder="Selecione o certificado"
          />
        </Grid>
        <Grid rowGap="0.5rem">
          <Text htmlFor="title" as="label">
            Título
          </Text>
          <Input
            id="title"
            placeholder="Bacharelado de Ciência da Computação"
          />
        </Grid>
        <Grid rowGap="0.5rem">
          <Text htmlFor="description" as="label">
            Descrição
          </Text>
          <Input
            id="description"
            placeholder="Certificado de João Dias, emitido pela universidade X"
          />
        </Grid>
        <Grid templateColumns={{ sm: '1fr 1fr' }} gap="1rem">
          <Grid rowGap="0.5rem">
            <Text htmlFor="description" as="label">
              Data de emissão
            </Text>
            <Input id="issueDate" type="datetime-local" />
          </Grid>
          <Grid rowGap="0.5rem">
            <Text htmlFor="description" as="label">
              Data de expiração
            </Text>
            <Input id="expirationDate" type="datetime-local" />
          </Grid>
        </Grid>
        <Text>ID do certificado: abc12421321</Text>
      </Grid>
      <Flex gap="1rem" direction={{ base: 'column', sm: 'row' }}>
        <Button
          type="button"
          colorScheme="green"
          variant="outline"
          width="100%"
        >
          Gerar ID
        </Button>
        <Button type="submit" colorScheme="green" width="100%">
          Registrar
        </Button>
      </Flex>
      <Text
        borderWidth="1px"
        borderColor="gray.200"
        padding="0.5rem"
        borderRadius="8px"
      >
        Última transação: 0x232193219214
      </Text>
    </Grid>
  );
}
