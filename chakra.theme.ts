import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { Styles } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles: Styles = {
  global: () => ({
    body: {
      background: 'gray.800',
    },
  }),
};

export const theme = extendTheme({ config, styles });
