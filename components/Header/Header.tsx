import { Flex } from '@chakra-ui/react';
import Image from 'next/image';

export function Header() {
  return (
    <Flex as="header">
      <Image
        src="/graduation.svg"
        width="64"
        height="64"
        alt="graduation hat"
      />
    </Flex>
  );
}
