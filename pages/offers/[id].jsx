import React from "react";
import { useRouter } from "next/router";

// ChakraUI
import { VStack, HStack, Box, Spacer, Text, Spinner, Heading } from "@chakra-ui/react";

// Provider
import { useProjectNFTProvider } from '../../src/context';

// My Components
import { NavBar } from "../../src/components/navBar";
import { NFT } from '../../src/components/nft';
import { OffertButton } from "../../src/components/offertButton";
import { OfferList } from '../../src/components/offers/offerList';

// Funcs
import { theNavBar } from "../../src/functions/navBar";
import { getNFT } from "../../src/functions/web3";


export default function Offers() {

    // useState
    const [nft, setNFT] = React.useState(null);
    const [height, setHeight] = React.useState(0);
    const [isOwner, setIsOwner] = React.useState(null);

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
        getOwner();
    };

    // Funcs
    const getOwner = async () => {
        const owner = await contract.methods.getNFTowner(tokenID).call();
        const ownerSTR = String(owner);
        const addressSTR = String(addressAccount);
        setIsOwner( ownerSTR.toLowerCase() == addressSTR.toLowerCase() );
    };

    // useEffect
    React.useEffect(() => {
        if (nft == null) {
            handleGetNFT();
        }
        if (height == 0) {
            setHeight(window.innerHeight);
        }
    });

    return(
        // Esto es solo Desktop, falta mobile.
        isOwner == null ? <Spinner /> :
        <>
        <VStack w='full' display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
            <NavBar {...theNavBar}/>
            <Box h='90px'/>
            {
                    !isOwner ?
                    <HStack w='full'>
                        <Spacer />
                        <NFT props={nft}/>
                        <Spacer />
                        <OffertButton />
                        <Spacer />
                    </HStack>
                    : 
                    <HStack w='full'>
                        <Spacer />
                        <Heading >Offers for your NFT</Heading>
                        <Spacer />
                        <NFT props={nft}/>
                        <Spacer />
                    </HStack>
            }
            
            <Box h='80px'/>
            <OfferList />
        </VStack>
        <VStack w='full' display={{lg: 'none', md: 'none', sm: 'flex', base: 'flex'}}>
            <NavBar {...theNavBar}/>
            <Box h='90px'/>
            {
                !isOwner ? 
                <>
                <NFT props={nft}/>
                <OffertButton />
                </> : 
                <>
                <Heading >Offers for your NFT</Heading>
                <NFT props={nft}/>
                </>
            }
            <Box h='30px'/>
            <OfferList />
        </VStack>
        </>
        
    );
}