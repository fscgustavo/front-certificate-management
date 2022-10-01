import { Button, Grid, Input, Text } from '@chakra-ui/react';

export function RevokeCertificate() {
  return (
    <Grid gap="1.5rem">
      <Grid rowGap="1.5rem" as="form">
        <Grid rowGap="0.5rem">
          <Text htmlFor="certificate" as="label">
            ID do certificado
          </Text>
          <Input id="certificateID" placeholder="1abc23d" />
        </Grid>
        <Button colorScheme="green" width="100%">
          Revogar
        </Button>
      </Grid>
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
