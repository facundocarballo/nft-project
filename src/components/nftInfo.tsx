import React from "react";
import { VStack, HStack, Box, Spacer, Text, Heading, Button, useColorModeValue } from "@chakra-ui/react";

import { NFTProps } from "./nft";

export const NFTInfo = ({props}: NFTProps) => {
    const getShortAddressWallet = () => {
        const firstPart = props.ownerAddress.substring(0, 5);
        const secondPart = props.ownerAddress.substring(props.ownerAddress.length - 5, props.ownerAddress.length);
        return firstPart + '...' + secondPart;
    };
    const borderColor = useColorModeValue('gray.400', 'gray.400');
    return(
        <VStack w='80%'>
            <VStack w='full' borderColor={borderColor} borderRadius={6} border='1px solid #A0AEC0'>
                <HStack h='50px' w='full' bg={borderColor} borderRadius={3}  border='1px solid #A0AEC0'>
                    <Box w='10px' />
                    <Text fontWeight='bold' fontSize='xl'>Description</Text>
                    <Spacer />
                </HStack>
                <Text margin='3px' p={3} justifyContent='center'>
                    {props.description}
                </Text>
            </VStack>
            <HStack w='full' borderColor={borderColor} borderRadius={6} border='1px solid #A0AEC0'>
                <HStack w='30%' bg={borderColor} borderRadius={3}>
                    <Spacer />
                    <VStack h='50px'>
                        <Spacer />
                        <Text fontWeight='bold' fontSize='xl'>Owner</Text>
                        <Spacer />
                    </VStack>
                    <Spacer />
                </HStack>
                <HStack w='full' borderColor={borderColor} borderRadius={6}>
                    <Spacer />
                    <VStack h='50px' display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
                        <Spacer />
                        <Text>{props.ownerAddress}</Text>
                        <Spacer />
                    </VStack>
                    <VStack h='50px' display={{lg: 'none', md: 'none', sm: 'flex', base: 'flex'}}>
                        <Spacer />
                        <Text>{getShortAddressWallet()}</Text>
                        <Spacer />
                    </VStack>
                    <Spacer />
                </HStack>
            </HStack>
        </VStack>
    );
};