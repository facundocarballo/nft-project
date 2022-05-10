import { HStack, Spacer, Box, Button, Link, Heading, Image, Container, IconButton, Collapse, Center, Stack,
     useColorMode, useColorModeValue, useDisclosure, VStack, Text, Spinner } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import React from "react";
import { useProjectNFTProvider } from "../context";
import { loadData } from "../functions/web3";

export const NavBar = (props) => {
    const {colorMode, toggleColorMode} = useColorMode();
    const bg = useColorModeValue('bgLight','bgDark');
    const backColor = useColorModeValue('#CBD5E0', '#718096');
    const isDark = colorMode === 'dark';
    const {isOpen, onToggle} = useDisclosure();
    const deletePhoto = useColorModeValue('https://i.ibb.co/zb4yLmf/basura.png','https://i.ibb.co/7SZQKmj/basura-DARK.png');

    const { 
        addressAccount, cryptoAmount, network,
        setAddressAccount, setCryptoAmount, setNetwork,
        setContract, setContractAddress, setNftsOfUser,
        contract, contractAddress
     } = useProjectNFTProvider();

    const handleGetWeb3Data = async () => {
        const res = await loadData();
        
        setAddressAccount(res.accountAddress);
        setCryptoAmount(res.cryptoAmount);
        setNetwork(res.Network);
        setContract(res.ContractNFT);
        setContractAddress(res.ContractAddress);
        setNftsOfUser(res.myNFTs);
    };

    const handleCancelOffers = async () => {
        const data = await contract.methods.deleteAllOffers().encodeABI();
        const nonce = await web3.eth.getTransactionCount(addressAccount);
        const estimateGas = await contract.methods.deleteAllOffers().estimateGas({
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
            console.log('Transaction ID:', res);
        });
    };

    const getShortAddressWallet = () => {
        const firstPart = addressAccount.substring(0, 5);
        const secondPart = addressAccount.substring(addressAccount.length - 5, addressAccount.length);
        return firstPart + '...' + secondPart;
    };

    return(
        <Container maxW='100%' p={4} style={{position:'fixed', zIndex: 100}} bg={bg}>
            <HStack>
                <Link href="https:facundo-carballo.web.app">
                    <Image
                    boxSize="50px"
                    src={props.photoURL}
                    alt="Facundo Carballo"
                    />
                </Link>
                
                { props.title != '' ? <Title title={props.title}/> : null }

                <Box display={{lg: 'flex', md: 'none', sm: 'none', base: 'none'}}>
                    {props.navItems.map((navItem, index) => 
                    <NextLink href={navItem.href} passHref key={index}>
                        <Button as='a' variant='headers'>
                            {navItem.label}
                        </Button>
                    </NextLink>
                    )} 
                </Box>

                <Spacer/>
                {
                    addressAccount == '' ? 
                    <Button onClick={handleGetWeb3Data} variant='headers'>
                        Connect your Wallet
                    </Button> : 
                    <Box display={{ lg: 'flex', md: 'none', sm: 'none', base: 'none' }} border='1px' borderColor={backColor} borderRadius={5}> 
                        <VStack w='100px'>
                            <Spacer />
                            <Heading fontSize='md'>{cryptoAmount} ETH</Heading>
                            <Spacer />
                        </VStack>
                        <Box w='75px' bg={backColor} borderRadius={5}>
                            <VStack w='full' h='50px'>
                                <Text fontSize='sm'>NET ID:</Text>
                                <Heading fontSize='md'>{network.id}</Heading>
                                <Spacer/>
                            </VStack>
                        </Box>
                        <Spacer />
                        <VStack w='150px'>
                            <Spacer/>
                            <Heading fontSize='sm'>{getShortAddressWallet()}</Heading>
                            <Spacer/>
                        </VStack>
                        <Spacer />
                    </Box>
                }

                {
                    addressAccount != '' ?
                    <Button w='100px' bg='null' p={3}  borderRadius={6} onClick={handleCancelOffers} cursor='pointer'>
                        <Image
                        src={deletePhoto}
                        alt='basura'
                        boxSize='30px'
                        />
                        <Text>OFFERS</Text>
                    </Button>
                    : null
                }
                
                <Button onClick={toggleColorMode} variant='headers'>
                {
                    colorMode === 'dark' 
                    ? <SunIcon/> : <MoonIcon/>
                }
                </Button>
                <Box display={{lg: 'none', md:'flex', sm:'flex'}}>
                    <IconButton
                    onClick={onToggle}
                    icon = {isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>}
                    variant = 'headers'
                    aria-label={'Toggle Navigation'}
                    />
                </Box>
            </HStack>
            <Collapse in={isOpen} animateOpacity>
                <Stack
                bg={isDark ? 'bgDark' : 'bgLight'}
                p={4}
                >
                    {props.navItems.map((navItem, index) => 
                    <Center key={index}> 
                        <NextLink href={navItem.href} passHref>
                            <Button w='100%' variant='headers' as='a' onClick={onToggle}>{navItem.label}</Button>
                        </NextLink>
                    </Center>
                    )}
                    {
                        addressAccount == '' ?
                        <Button onClick={() => handleGetWeb3Data()}>
                            Connect your Wallet
                        </Button> : 
                        <VStack>
                            <Text>Address: {getShortAddressWallet()}</Text>
                            <Text>{cryptoAmount} {network.id == 4 ? 'ETH' : 'BNB'}</Text>
                            <Text>Net ID: {network.id}</Text>
                        </VStack>
                    }
                </Stack>
            </Collapse>
        </Container>
    );
}

const Title = (props) => {
    return (
        <HStack>
            <Container maxW='2em'/>
            <Heading as='h1' fontSize={{base: 'xl', sm: '2xl', md: '4xl'}}>
                {props.title}
            </Heading>
        </HStack>
    )
}