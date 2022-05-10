import React from "react";
import { useRouter } from "next/router";
import NextLink from 'next/link';

// ChakraUI Components
import { VStack, Spacer, Button, HStack, Spinner, Box } from "@chakra-ui/react";

// My Components
import { NFT } from '../../src/components/nft';
import { NFTInfo } from '../../src/components/nftInfo';
import { NavBar } from '../../src/components/navBar';
import { Warning } from '../../src/components/warning';

// Funcs
import { getNFT } from '../../src/functions/web3';
import { theNavBar } from '../../src/functions/navBar';
import { connectWallet } from '../../src/functions/warnings';

// Provider
import { useProjectNFTProvider } from '../../src/context';

export default function TokenID() {

    // useState
    const [nft, setNFT] = React.useState(null);
    const [height, setHeight] = React.useState(0);

    // Router
    const router = useRouter();
    const tokenID  = router.query.id;

    // Provider
    const { contract, addressAccount } = useProjectNFTProvider();
    
    // Funcs
    const handleGetNFT = async () => {
        if (contract == null) return;
        const theNFT = await getNFT(contract, tokenID);
        setNFT(theNFT);
    };

    // useEffect
    React.useEffect(() => {
        if(nft == null) {
            handleGetNFT();
        }
       if (height == 0) {
            setHeight(window.innerHeight);
       }
       
    });

    return(
        // Esto es solo Desktop, falta mobile
        <>
        {
            height == 0 ? <Spinner />
            :
            <>
            <VStack w='full' h={height} display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
                <NavBar {...theNavBar} />
                <Spacer />
                    {
                        addressAccount == '' ? <Warning {...connectWallet} /> :
                        nft == null || nft == undefined ? <Spinner /> :
                        <HStack w='full'>
                            <Spacer />
                            <NFT props={nft} />
                            <Spacer />
                            <VStack w='50%'>
                                <NFTInfo props={nft} />
                                <Box h='100px' />
                                <HStack w='80%'>
                                    <Spacer />
                                    <NextLink href={`/offers/${nft.id}`}>
                                        <Button variant='callToAction'>See Offers</Button>
                                    </NextLink>
                                </HStack>
                            </VStack>
                            <Spacer />
                        </HStack>
                    }
                <Spacer />
            </VStack>
            <VStack w='full' display={{lg: 'none', md: 'none', sm: 'flex', base: 'flex'}}>
                <NavBar {...theNavBar} />
                {
                        addressAccount == '' ? <Warning {...connectWallet} /> :
                        nft == null || nft == undefined ? <Spinner /> :
                        <VStack w='full'>
                            <Box h='80px' />
                            <HStack w='full'>
                                <Spacer />
                                <NFT props={nft} />
                                <Spacer />
                            </HStack>
                            <NFTInfo props={nft} />
                            <Box h='10px' />
                            <NextLink href={`/offers/${nft.id}`}>
                                <Button variant='callToAction'>See Offers</Button>
                            </NextLink>
                        </VStack>
                    }
            </VStack>
            </>
            
        }
        </>
    );
}