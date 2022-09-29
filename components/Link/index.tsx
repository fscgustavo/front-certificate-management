import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';

export function Link(props: LinkProps) {
  return <ChakraLink as={NextLink} {...props} />;
}
