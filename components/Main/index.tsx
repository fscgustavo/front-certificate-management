import { Avatar, Box, Button, Flex } from '@chakra-ui/react';
import { Web3Button } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';
import Image from 'next/image';
import { ReactNode } from 'react';
import { truncateMiddleOfString } from '../../utils';
import { Link } from '../Link';
import { useIsMounted } from '../../hooks/useIsMounted';

type MainProps = {
  children: ReactNode;
};

function AuthComponent() {
  const isMounted = useIsMounted();
  const { isConnected, address = '0x0', status } = useAccount();

  const { disconnect } = useDisconnect();

  if (!status || !isMounted()) {
    return null;
  }

  if (!isConnected) {
    return <Web3Button />;
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
        onClick={() => disconnect()}
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
