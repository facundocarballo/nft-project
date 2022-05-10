import React from 'react';
import { useRouter } from "next/router";

// ChakraUI
import { Button, HStack, Spacer, Input, VStack, Box, Text, Link, Spinner } from '@chakra-ui/react';

// Provider
import { useProjectNFTProvider } from '../context';


export const OffertButton = () => {
    // useState
    const [amount, setAmount] = React.useState('');
    const [linkToScan, setLinkToScan] = React.useState('');

    // Router
    const router = useRouter();
    const tokenID  = router.query.id;

    // Provider
    const { network, contract, addressAccount, contractAddress } = useProjectNFTProvider();

    const handleChange = (event) => setAmount(event.target.value);
    const handleOffer = async () => {
        const data = await contract.methods.makeOffer(tokenID).encodeABI();

        const nonce = await web3.eth.getTransactionCount(addressAccount);

        const estimateGas = await contract.methods.makeOffer(tokenID).estimateGas({
            from: addressAccount,
            nonce: nonce,
            to: contractAddress,
            data: data
        }); 

        const params = {
            from: addressAccount,
            to: contractAddress,
            value: window.web3.utils.toHex(window.web3.utils.toWei(amount, 'ether')),
            gas: window.web3.utils.toHex(estimateGas*2), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('20', 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            document.getElementById('offerDone').innerHTML = `Your offer is pending, here is your Transaction ID: ${res}`;
            setLinkToScan(network.scanURL + `tx/${res}`);
        });
    };

    return(
        contract == null || contract == undefined ? <Spinner /> :
        <VStack w={{lg:'50%', md: '50%', sm: '80%', base: '80%'}} h='70px'>
            <HStack w='full' h='50px' borderRadius={6} border='1px solid #A0AEC0'>
                <Input
                value={amount}
                onChange={handleChange}
                placeholder={network.id == 4 ? "Amount of ETH to Offer" : "Amount of BNB to Offer"}
                border='none'
                />
                <Button w='30%' h='full' bg='#A0AEC0' borderRadius={3} onClick={handleOffer} fontWeight='bold' fontSize={{lg: '3xl', md: '3xl', sm: 'md', base: 'md'}}>
                    Offer
                </Button>
            </HStack>
            <Box h='10px' />
            <Link href={linkToScan} isExternal>
                <Text id='offerDone' />
            </Link>
        </VStack>
    );
};