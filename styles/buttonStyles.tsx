import { useColorModeValue } from '@chakra-ui/color-mode';

export const ButtonStyles = {
    baseStyle: {},
    sizes: {},
    variants: {
        headers: () => ({
            bg: useColorModeValue('bgLight', 'bgDark'),
            color: useColorModeValue('bgDark', 'bgLight'),
            margin: '2px',
            _hover: {
                boxShadow: 'md',
                transform: 'scale(1.02)',
                bg: useColorModeValue('gray.300', 'gray.600'),
            }
        }),
        callToAction: () => ({
            bg: useColorModeValue('gray.600', 'gray.100'),
            color: useColorModeValue('bgLight', 'bgDark'),
            margin: '2px',
            _hover: {
                boxShadow: 'md',
                transform: 'scale(1.02)',
            }
        }), 
    },
    defaultProps: {}
}