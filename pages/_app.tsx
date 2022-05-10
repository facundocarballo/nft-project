import { ChakraProvider } from '@chakra-ui/react'
import { ProjectNFTProvider } from '../src/context';
import type { AppProps } from 'next/app'
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProjectNFTProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProjectNFTProvider>
  )
 
}

export default MyApp
