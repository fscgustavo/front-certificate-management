import { Avatar, Box, Button, Flex } from '@chakra-ui/react';
import { ConnectButton } from '@web3modal/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useMoralis } from 'react-moralis';
import { truncateMiddleOfString } from '../../utils/truncateMiddleOfString';
import { Link } from '../Link';

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps) {
  const { isAuthenticated, account } = useMoralis();

  return (
    <>
      <Box as="header" borderBottom="1px" borderColor="gray.200">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxWidth="80rem"
          marginX="auto"
          paddingX="1rem"
          gap="2rem"
          wrap="wrap"
          paddingY={{ base: '1rem', md: '0.5rem' }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Image
            src="/graduation.svg"
            width="64"
            height="64"
            alt="graduation hat"
            style={{ flexShrink: 0 }}
          />
          {isAuthenticated && (
            <Flex
              gap="1.5rem"
              direction={{ base: 'column', sm: 'row' }}
              textAlign="center"
            >
              <Link href="/">Home</Link>
              <Link href="/organizacao">Organização</Link>
              <Link href="/universidade">Universidade</Link>
              <Link href="certificador">Certificador</Link>
            </Flex>
          )}
          {isAuthenticated && account ? (
            <Button variant="unstyled" display="flex" gap="0.75rem">
              <Avatar bg="teal.500" />
              {truncateMiddleOfString({ fullString: account })}
            </Button>
          ) : (
            <ConnectButton />
          )}
        </Flex>
      </Box>
      <Box maxWidth="80rem" marginX="auto">
        {children}
      </Box>
    </>
  );
}
