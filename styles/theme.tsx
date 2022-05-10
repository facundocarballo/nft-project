import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { ButtonStyles as Button } from './buttonStyles';


const config : ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: true,
}

const colors = {
    bgDark: '#2D3748',
    bgLight: '#EDF2F7'
}

const components = { Button };

const theme = extendTheme({config, colors, components});

export default theme;