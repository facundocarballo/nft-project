import React from "react";
import { VStack, HStack, Spacer, Box, Text, Image, useColorModeValue, Spinner } from "@chakra-ui/react";

export interface NFTProps {
    props: {
        name: string,
        photoURL: string,
        description: string,
        ownerAddress: string
        id: number
    }
}

export const NFT = ({props}: NFTProps) => {
    const bgSoft = useColorModeValue('gray.100', 'gray.600');
    const bgHeavy = useColorModeValue('gray.300', 'gray.400');
    const [height, setHeight] = React.useState(0);
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }, []);

    if (height == 0 || width == 0 || props == undefined)
        return <Spinner />;

    return (
        
        <>
        <VStack h={height / 2.1} w={width / 4.3} display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
            <Box h='full' w='full' bg={bgSoft} borderRadius={7}>
                <VStack w='full' h='70%' bg={bgSoft} borderRadius={7}>
                    <Spacer />
                    <Image
                    src={props.photoURL}
                    alt='NFT Image'
                    boxSize='150px'
                    />
                    <Spacer />
                </VStack> 
                           
                <VStack w='full' h='30%' bg={bgHeavy} borderRadius={7}>
                    <Spacer />
                    <Text>{props.name}</Text>
                    <Spacer />
                </VStack>
            </Box>
        </VStack>
        <VStack h={height / 2.5} w={width / 1.2} display={{lg: 'none', md: 'none', sm: 'flex', base: 'flex'}}>
            <Box h='full' w='full' bg={bgSoft} borderRadius={7}>
                <VStack w='full' h='70%' bg={bgSoft} borderRadius={7}>
                    <Spacer />
                    <Image
                    src={props.photoURL}
                    alt='NFT Image'
                    boxSize='150px'
                    />
                    <Spacer />
                </VStack> 
                        
                <VStack w='full' h='30%' bg={bgHeavy} borderRadius={7}>
                    <Spacer />
                    <Text>{props.name}</Text>
                    <Spacer />
                </VStack>
            </Box>
        </VStack>
        </>
    );
};


/**
 * 
 *  <>
            {
                height == 0 || width == 0 || props == undefined ? <Spinner /> :
                    <VStack h={height / 2.1} w={width / 4.3} display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
                    <Box h='full' w='full' bg={bgSoft} borderRadius={7}>
                        <VStack w='full' h='70%' bg={bgSoft} borderRadius={7}>
                            <Spacer />
                            <Image
                            src={props.photoURL}
                            alt='NFT Image'
                            boxSize='150px'
                            />
                            <Spacer />
                        </VStack> 
                           
                        <VStack w='full' h='30%' bg={bgHeavy} borderRadius={7}>
                            <Spacer />
                            <Text>{props == undefined || props.name == '' ? 'NFT Name' : props.name}</Text>
                            <Spacer />
                        </VStack>
                    </Box>
                </VStack>
            }
            {
                width == 0 || height == 0 || props == undefined ? <Spinner /> :
                <VStack h={height / 1.5} w={width / 1.2} display={{lg: 'none', md: 'none', sm: 'flex', base: 'flex'}}>
                    <Box h='full' w='full' bg={bgSoft} borderRadius={7}>
                        {
                            props == undefined || props.photoURL == '' ?
                            <VStack w='full' h='70%' bg={bgSoft} borderRadius={7}>
                                <Spacer />
                                <Text>NFT Image</Text>
                                <Spacer />
                            </VStack> :
                            <Image
                            src={props.photoURL}
                            alt='NFT Image'
                            boxSize='300px'
                            /> 
                        }
                        <VStack w='full' h='30%' bg={bgHeavy} borderRadius={7}>
                            <Spacer />
                            <Text>{props == undefined || props.name == '' ? 'NFT Name' : props.name}</Text>
                            <Spacer />
                        </VStack>
                    </Box>
                </VStack>
            }
        </>
 */