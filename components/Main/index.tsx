import { Avatar, Box, Button, Flex } from '@chakra-ui/react';
import { ConnectButton, useAccount, useDisconnect } from '@web3modal/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { truncateMiddleOfString } from '../../utils';
import { Link } from '../Link';

type MainProps = {
  children: ReactNode;
};

function AuthComponent() {
  const {
    account: { isConnected, address, status },
  } = useAccount();

  const disconnect = useDisconnect();

  if (!status) {
    return null;
  }

  if (!isConnected) {
    return <ConnectButton />;
  }

  return (
    <>
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
      <Button
        variant="unstyled"
        display="flex"
        gap="0.75rem"
        onClick={disconnect}
      >
        <Avatar bg="teal.500" size="sm" />
        {truncateMiddleOfString({ fullString: address })}
      </Button>
    </>
  );
}

export function Main({ children }: MainProps) {
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
          <AuthComponent />
        </Flex>
      </Box>
      <Box maxWidth="80rem" marginX="auto">
        {children}
      </Box>
    </>
  );
}
