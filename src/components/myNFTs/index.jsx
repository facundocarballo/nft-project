import React from "react";
import { VStack, HStack, Spacer, Box, Image, Spinner } from "@chakra-ui/react";
import { Warning } from '../warning';
import { connectNetwork, connectWallet, createNFT } from "../../functions/warnings";
import { useProjectNFTProvider } from '../../context';
import { ShowMyNFTs } from './showMyNFTs'

export const MyNFTs = () => {
    const { addressAccount, network, nftsOfUser } = useProjectNFTProvider();
    const isNetworkOK = (id) => { return (id == 97) || (id == 4) };

    const haveNFTs = () => (nftsOfUser == null || nftsOfUser.length == 0);
    return (
        <VStack h='full' w='full'>
            { addressAccount == '' ? <Warning {...connectWallet}/> : 
                !isNetworkOK(network.id) ? <Warning {...connectNetwork}/> :
                    haveNFTs() ? <Warning {...createNFT}/> : <ShowMyNFTs />
            }
        </VStack>
    );
};