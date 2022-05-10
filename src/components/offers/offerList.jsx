import React from "react";
import { useRouter } from "next/router";

// ChakraUI
import { Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';

// Provider
import { useProjectNFTProvider } from '../../context';

// Funcs
import { getOffers } from "../../functions/web3";


export const OfferList = () => {

    // useState
    const [offers, setOffers] = React.useState(null);
    const [isOwner, setIsOwner] = React.useState(null);

    // Router
    const router = useRouter();
    const tokenID  = router.query.id;

    // Provider
    const { contract, addressAccount, contractAddress } = useProjectNFTProvider();

    // Funcs
    const getOwner = async () => {
        const owner = await contract.methods.getNFTowner(tokenID).call();
        const ownerSTR = String(owner);
        const addressSTR = String(addressAccount);
        setIsOwner( ownerSTR.toLowerCase() == addressSTR.toLowerCase() );
    };

    const handleGetOffers = async () => {
        if (contract == null) return;
        const theOffers = await getOffers(contract, tokenID);
        setOffers(theOffers);
        getOwner();
    };

    const getShortAddressWallet = () => {
        const firstPart = addressAccount.substring(0, 5);
        const secondPart = addressAccount.substring(addressAccount.length - 5, addressAccount.length);
        return firstPart + '...' + secondPart;
    };

    const handleAcceptOffer = async (offerID) => {

        const data = contract.methods.acceptOffer(tokenID, offerID).encodeABI();

        const nonce = await web3.eth.getTransactionCount(addressAccount);

        const estimateGas = await contract.methods.acceptOffer(tokenID, offerID).estimateGas({
            from: addressAccount,
            nonce: nonce,
            to: contractAddress,
            data: data
        }); 

        const params = {
            from: addressAccount,
            to: contractAddress,
            gas: window.web3.utils.toHex(estimateGas), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('50', 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => { 
            console.log('Transaction ID: ', res); 
        });

    };


    // useEffect
    React.useEffect(() => {
        if (offers == null) {
            handleGetOffers();
        }
    });

    return(
        <>
        {
            offers == null || isOwner == null ? <Spinner />
            :
            <HStack w='full'>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Offert ID</Th>
                            <Th>Offert By </Th>
                            <Th>Amount</Th>
                            <Th>Offert State</Th>
                        </Tr>
                    </Thead>
                        {
                            offers.map((offer, idx) => 
                            <Thead key={idx}>
                                <Tr>
                                    <Th>{offer.id}</Th>
                                    <Th>{getShortAddressWallet()}</Th>
                                    <Th>{offer.amount}</Th>
                                    <Th>{offer.state ? isOwner ? <Button onClick={ () => handleAcceptOffer(offer.id) } variant='callToAction'>Accept Offer</Button> : 'true' : 'false'}</Th>
                                </Tr>
                            </Thead>)
                        }
                </Table>
            </HStack>
        }
        </>
        
    );
};
