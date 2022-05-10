import React from "react";
import { VStack, HStack, Spacer, Text, Heading, Box, Button, Grid, GridItem} from "@chakra-ui/react";
import { NFT } from "../nft";
import { useProjectNFTProvider } from "../../context";
import NextLink from 'next/link';

export const ShowMyNFTs = () => {

    const { nftsOfUser } = useProjectNFTProvider();

    return(
            <VStack>
                <Box h='20px' />
                <VStack w='full' display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
                    <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                        
                        {
                            nftsOfUser.map((nft, idx) => 
                            <NextLink href={`/tokenID/${nft.id}`} key={idx}>
                                <GridItem>
                                    <NFT props={nft} />
                                </GridItem>
                            </NextLink>
                            )
                        }
                    </Grid>
                </VStack>
                <VStack w='full' display={{lg: 'none', md: 'none', sm: 'flex', base: 'flex'}}>
                    <Grid templateColumns='repeat(1, 1fr)' gap={6}>
                        
                        {
                            nftsOfUser.map((nft, idx) => 
                            <NextLink href={`/tokenID/${nft.id}`} key={idx}>
                                <GridItem>
                                    <NFT props={nft} />
                                </GridItem>
                            </NextLink>
                            )
                        }
                    </Grid>
                </VStack>
            </VStack>
    );
};