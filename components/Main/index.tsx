import { Box, Flex } from '@chakra-ui/react';
import { ConnectButton, useAccount } from '@web3modal/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Link } from '../Link';

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps) {
  const { connected } = useAccount();

  return (
    <>
      <Box as="header" borderBottom="1px" borderColor="gray.200">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxWidth="80rem"
          marginX="auto"
          paddingX="1rem"
        >
          <Image
            src="/graduation.svg"
            width="64"
            height="64"
            alt="graduation hat"
          />
          {connected && (
            <Flex gap="1.5rem">
              <Link href="/">Home</Link>
              <Link href="/organizacao">Organização</Link>
              <Link href="/universidade">Universidade</Link>
              <Link href="certificador">Certificador</Link>
            </Flex>
          )}
          <ConnectButton />
        </Flex>
      </Box>
      <Box maxWidth="80rem" marginX="auto">
        {children}
      </Box>
    </>
  );
}
