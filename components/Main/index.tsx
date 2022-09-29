import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Link } from '../Link';

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps) {
  return (
    <>
      <Box as="header" borderBottom="1px" borderColor="gray.200">
        <Flex alignItems="center" maxWidth="80rem" marginX="auto">
          <Image
            src="/graduation.svg"
            width="64"
            height="64"
            alt="graduation hat"
          />
          <Flex>
            <Link href="/">Home</Link>
            <Link href="/organizacao">Organização</Link>
            <Link href="/universidade">Universidade</Link>
            <Link href="certificador">Certificador</Link>
          </Flex>
        </Flex>
      </Box>
      <Box maxWidth="80rem" marginX="auto">
        {children}
      </Box>
    </>
  );
}
