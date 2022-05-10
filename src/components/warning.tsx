import React from "react";
import { VStack, HStack, Spacer, Heading, Image, Box, Button, Spinner } from "@chakra-ui/react";
import NextLink from 'next/link';

export interface WarningProps {
    props: {
        photoURL: string,
        label: string,
        button?: {
            label: string,
            href: string
        }
    }
}

export const Warning = ({props}: WarningProps) => {
    const [height, setHeight] = React.useState(0);
    React.useEffect(() => { setHeight(window.innerHeight); }, []);
    return (
        <>
            {
                height == 0 ? <Spinner /> :
                <VStack h={height - 70} w='full'>
                    <Spacer />
                    <HStack w='full' display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
                        <Spacer />
                        <Image
                        src={props.photoURL}
                        alt='warning'
                        boxSize='200px'
                        />
                        <Box w='10px'/>
                        <Heading>{props.label}</Heading>
                        <Spacer />
                    </HStack>
                    <VStack display={{lg: 'none', md: 'none', sm: 'flex', base: 'flex'}}>
                        <Image
                        src={props.photoURL}
                        alt='warning'
                        boxSize='200px'
                        />
                        <Box w='10px'/>
                        <Heading>{props.label}</Heading>
                    </VStack>
                    <Box h='10px' />
                    { props.button != undefined ? 
                        <NextLink href={props.button.href}>
                            <Button>{props.button.label}</Button>
                        </NextLink> : null
                    }
                    <Spacer />
                </VStack>
            }
        </>
        
    );
};