import React from "react";
import { VStack, HStack, Spacer, Button, Text, Image, Box, Input, useColorModeValue, Spinner, Container, useColorMode, Link } from "@chakra-ui/react";
import { useProjectNFTProvider } from "../../context";

export const CreateNFT = () => {
    const [height, setHeight] = React.useState();

    const [photoURL, setPhotoURL] = React.useState('');
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [afterCreate, setAfterCreate] = React.useState(false);
    const [linkToScan, setLinkToScan] = React.useState('');

    const bgSoft = useColorModeValue('gray.100', 'gray.600');
    const bgHeavy = useColorModeValue('gray.300', 'gray.400');
    const bgVHeavy = useColorModeValue('gray.500' , 'gray.100');

    const { colorMode } = useColorMode();
    const isDark = ('dark' === colorMode);

    // Provider
    const { contract, contractAddress, addressAccount, network } = useProjectNFTProvider();

    React.useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    const handleCreateNFT = async () => {
        const data = await contract.methods.createNFT(name, description, photoURL).encodeABI();

        const nonce = await web3.eth.getTransactionCount(addressAccount);
        
        const estimateGas = await contract.methods.createNFT(name, description, photoURL).estimateGas({
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
            setAfterCreate(true);
            document.getElementById('transactionID').innerHTML = `Transaction ID: ${res}`;
            setLinkToScan(network.scanURL + `tx/${res}`);
        });
    };

    return( height == 0 || contract == null || contract == undefined ? <Spinner /> : 
        <VStack h={height - 75} w='full'>
            <Spacer />
            <HStack display={{lg: 'flex', md:'flex', sm:'none', base:'none'}} w='full' h='full'>
                <Spacer />
                <VStack h={height / 2} w={height / 1.8}>
                    <Box h='full' w='full' bg={bgSoft} borderRadius={7}>
                        {
                            photoURL == '' ?
                            <VStack w='full' h='70%' bg={bgSoft} borderRadius={7}>
                                <Spacer />
                                <Text>NFT Image</Text>
                                <Spacer />
                            </VStack> :
                            <VStack w='full' h='70%'>
                                <Spacer />
                                <HStack w='full'>
                                    <Spacer />
                                    <Image
                                    src={photoURL}
                                    alt='NFT Image'
                                    boxSize='200px'
                                    />
                                    <Spacer />
                                </HStack>
                                <Spacer />
                            </VStack>
                        }
                        <VStack w='full' h='30%' bg={bgHeavy} borderRadius={7}>
                            <Spacer />
                            <Text>{name == '' ? 'NFT Name' : name}</Text>
                            <Spacer />
                        </VStack>
                    </Box>
                </VStack>
                <Spacer />
                <VStack h={height / 2} w={height / 1.8}>
                    <HStack w='full' h='50px' borderColor={bgSoft} borderRadius={7}>
                        <HStack w='35%' h='full' bg={bgSoft} borderRadius={7}>
                            <Spacer />
                            <VStack>
                                <Spacer />
                                    <Text>Name</Text>
                                <Spacer />
                            </VStack>
                            <Spacer />
                        </HStack>
                        <Input
                        w='70%'
                        h='full'
                        placeholder="NFT Name..."
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </HStack>
                    <HStack w='full' h='50px' borderColor={bgSoft} borderRadius={7}>
                        <HStack w='35%' h='full' bg={bgSoft} borderRadius={7}>
                            <Spacer />
                            <VStack>
                                <Spacer />
                                    <Text>Photo URL</Text>
                                <Spacer />
                            </VStack>
                            <Spacer />
                        </HStack>
                        <Input
                        w='70%'
                        h='full'
                        placeholder="Photo URL..."
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.currentTarget.value)}
                        />
                    </HStack>
                    <Box w='full' h='full' borderRadius={7} borderColor={bgSoft}>
                        <VStack w='full' h='full'>
                        <HStack bg={bgSoft} w='full' h='20%' borderRadius={7}>
                                <Spacer />
                                <Text>Description</Text>
                                <Spacer />
                            </HStack>
                            {
                                isDark ?
                                <textarea 
                                style={{
                                    borderRadius: 7,
                                    borderColor: bgSoft,
                                    backgroundColor: '#1A202C',
                                    border: '1px solid #4A5568',
                                    height:'80%',
                                    width:'100%',
                                    padding: '8px'
                                }}
                                placeholder="NFT Description..."
                                value={description}
                                onChange={(e) => setDescription(e.currentTarget.value)}
                                /> :
                                <textarea 
                                style={{
                                    borderRadius: 7,
                                    borderColor: bgSoft,
                                    backgroundColor: '#fff',
                                    border: '1px solid #EDF2F7',
                                    height:'80%',
                                    width:'100%',
                                    padding: '8px'
                                }}
                                placeholder="NFT Description..."
                                value={description}
                                onChange={(e) => setDescription(e.currentTarget.value)}
                                />
                            }
                        </VStack>
                    </Box>
                </VStack>
                <Spacer />
            </HStack>
            <VStack display={{lg: 'none', md:'none', sm:'flex', base:'flex'}} w='full' h='full'>
                <Box h='10px' />
                <VStack h='full' w={height / 1.8}>
                    <HStack w='full' h='50px' borderColor={bgSoft} borderRadius={7}>
                        <HStack w='30%' h='full' bg={bgSoft} borderRadius={7}>
                            <Spacer />
                            <VStack>
                                <Spacer />
                                    <Text>Name</Text>
                                <Spacer />
                            </VStack>
                            <Spacer />
                        </HStack>
                        <Input
                        w='70%'
                        h='full'
                        placeholder="NFT Name..."
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </HStack>
                    <HStack w='full' h='50px' borderColor={bgSoft} borderRadius={7}>
                        <HStack w='30%' h='full' bg={bgSoft} borderRadius={7}>
                            <Spacer />
                            <VStack>
                                <Spacer />
                                    <Text>Photo URL</Text>
                                <Spacer />
                            </VStack>
                            <Spacer />
                        </HStack>
                        <Input
                        w='70%'
                        h='full'
                        placeholder="Photo URL..."
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.currentTarget.value)}
                        />
                    </HStack>
                    <Box w='full' h='full' borderRadius={7} borderColor={bgSoft}>
                        <VStack w='full' h='full'>
                        <HStack bg={bgSoft} w='full' h='20%' borderRadius={7}>
                                <Spacer />
                                <Text>Description</Text>
                                <Spacer />
                            </HStack>
                            {
                                isDark ?
                                <textarea 
                                style={{
                                    borderRadius: 7,
                                    borderColor: bgSoft,
                                    backgroundColor: '#1A202C',
                                    border: '1px solid #4A5568',
                                    height:'80%',
                                    width:'100%',
                                    padding: '8px'
                                }}
                                placeholder="NFT Description..."
                                value={description}
                                onChange={(e) => setDescription(e.currentTarget.value)}
                                /> :
                                <textarea 
                                style={{
                                    borderRadius: 7,
                                    borderColor: bgSoft,
                                    backgroundColor: '#fff',
                                    border: '1px solid #EDF2F7',
                                    height:'80%',
                                    width:'100%',
                                    padding: '8px'
                                }}
                                placeholder="NFT Description..."
                                value={description}
                                onChange={(e) => setDescription(e.currentTarget.value)}
                                />
                            }
                        </VStack>
                    </Box>
                </VStack>
                <Spacer />
                <VStack h='full' w={height / 1.8}>
                    <Box h='full' w='full' bg={bgSoft} borderRadius={7}>
                        {
                            photoURL == '' ?
                            <VStack w='full' h='70%' bg={bgSoft} borderRadius={7}>
                                <Spacer />
                                <Text>NFT Image</Text>
                                <Spacer />
                            </VStack> :
                            <Image
                            src={photoURL}
                            alt='NFT Image'
                            boxSize='300px'
                            />
                        }
                        <VStack w='full' h='30%' bg={bgHeavy} borderRadius={7}>
                            <Spacer />
                            <Text>{name == '' ? 'NFT Name' : name}</Text>
                            <Spacer />
                        </VStack>
                    </Box>
                </VStack>
                <Box h='10px' />
            </VStack>
            <Button isDisabled={afterCreate} w={{lg: '50%', md: '50%', sm: '90%', base: '90%'}} h='50px' variant='callToAction' onClick={handleCreateNFT}>
                Deploy Your NFT
            </Button>
            <Link href={linkToScan} isExternal>
                <Text id='transactionID' />
            </Link>
            <Spacer />
        </VStack>
    );

};
