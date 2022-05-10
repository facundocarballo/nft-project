import React from "react";
import { VStack, HStack, Spacer, Box, Image, Text, Heading, Grid, GridItem, Container, Spinner,  } from "@chakra-ui/react";
import { NFT } from '../nft';
import { SearchBar } from "../searchBar";
import { useProjectNFTProvider } from "../../context";
import { getListOfNFTs, getNFT } from '../../functions/web3';
import NextLink from 'next/link';

export const ListNFT = () => {
    // useState
    const [nfts, setNFTs] = React.useState(null);

    // Provider
    const { contract, searchInputValue, isSearching } = useProjectNFTProvider();

    // Funcs
    const handleGetNFTs = async () => {
        if (contract == null) return;
        const theNFTs = await getListOfNFTs(contract);
        setNFTs(theNFTs);
    };
    
    const handleSearchNFT = async () => {
        if (contract == null) return;
        const theNFT = await getNFT(contract, searchInputValue);
        setNFTs([theNFT]);
    };


    // useEffect
    React.useEffect(() => {
        if (nfts == null) {
            handleGetNFTs();
        }
        if (isSearching) {
            handleSearchNFT();
        }
    }); 

    const testNFTs = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    return(
        <VStack w='full'>
            <HStack w='full' h='50px'>
                <Box w='15px'/>
                <Heading fontSize={{sm: 'xl', base:'xl'}}>NFTs Mint</Heading>
                <Spacer />
                <SearchBar />
                <Box w='15px' />
            </HStack>
            <HStack w='full'>
                <Box w='15px' />
                <Text fontSize='sm' color='gray.400'>This page just returns the last 30 NFT minted, if you want to see an specific NFT you will have to search it.</Text>
                <Spacer />
            </HStack>
            <Box h='15px' />
            
            <VStack w='full' display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
                {
                    nfts == null || nfts == undefined ? <Spinner /> :
                    nfts.length == 0 ? 
                    <HStack w='full'>
                        <Spacer />
                        <Text color='gray.400' fontSize='lg'>None NFTs created yet</Text> 
                        <Spacer />
                    </HStack>
                    :
                    <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                        {
                            nfts.map((nft, idx) => 
                            <NextLink href={`/tokenID/${nft.id}`} key={idx}>
                                <GridItem>
                                    <NFT props={nft} />
                                </GridItem>
                            </NextLink>
                            )
                        }
                    </Grid>
                }
                
            </VStack>
            <VStack w='full' display={{lg: 'none', md: 'none', sm: 'flex', base: 'flex'}}>
                <Grid templateColumns='repeat(1, 1fr)' gap={6}>
                    {
                    nfts == null || nfts == undefined ? <Spinner /> :
                    nfts.length == 0 ? 
                    <HStack w='full'>
                        <Spacer />
                        <Text color='gray.400' fontSize='lg'>None NFTs created yet</Text> 
                        <Spacer />
                    </HStack>
                    :
                    <Grid templateColumns='repeat(1, 1fr)' gap={6}>
                        {
                            nfts.map((nft, idx) => 
                            <NextLink href={`/tokenID/${nft.id}`} key={idx}>
                                <GridItem>
                                    <NFT props={nft} />
                                </GridItem>
                            </NextLink>
                            )
                        }
                    </Grid>
                }
                </Grid>
            </VStack>
        </VStack>
    );
};