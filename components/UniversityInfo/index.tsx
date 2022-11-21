import { Grid, Spinner, Text } from '@chakra-ui/react';
import { useReadOperation } from '../../hooks/useReadOperation';
import useSWR from 'swr';
import Image from 'next/image';

function getGatewaySource(source: string) {
  const cid = source.replace('ipfs://', '');

  return `https://ipfs.io/ipfs/${cid}`;
}

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export function UniversityInfo({ address }: { address: string }) {
  const {
    data: [isValidUniversity, contentCID],
  } = useReadOperation({
    functionName: 'getUniversity',
    args: [address],
  });

  const cid = contentCID.replace('ipfs://', '');

  const { data } = useSWR(`https://ipfs.io/ipfs/${cid}`, fetcher, {});

  if (!data) {
    return <Spinner />;
  }

  return (
    <Grid gap="0.5rem">
      <Text fontWeight="bold" fontSize="1.25rem">
        Dados da universidade
      </Text>
      <Text>Nome: {data.name}</Text>
      <Text>Status: {isValidUniversity ? 'Válida' : 'Inválida'}</Text>
      <div>
        <Image
          src={getGatewaySource(data.logo)}
          alt={data.name}
          width="300"
          height="300"
        />
      </div>
    </Grid>
  );
}
