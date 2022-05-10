import React from "react";
import { VStack, HStack, Box, Spacer, Input, useColorModeValue, InputGroup, InputLeftElement, InputRightElement, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useProjectNFTProvider } from '../context/index';

export const SearchBar = () => {
    const { searchInputValue, setSearchInputValue, setIsSearching, isSearching } = useProjectNFTProvider();
    const borderColor = useColorModeValue('gray.300', 'gray.400');

    const handleSearch = () => {
        setSearchInputValue(searchInputValue);
        setIsSearching(true);
    };
    const handleCancelSearch = () => {
        setIsSearching(false);
    };

    return (
        <HStack w={{lg:'30%', md: '30%', sm: '50%', base: '50%'}} h='50px' borderRadius={7}>
            <Box w='5px' />
            <InputGroup borderColor={borderColor}>
                <InputLeftElement>
                    <SearchIcon color={borderColor} />
                </InputLeftElement>
                <Input
                placeholder="Search a NFT by his ID"
                type='search'
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.currentTarget.value)}
                />
                <InputRightElement w='100px'>
                    {
                        !isSearching ? 
                        <Button w='full' variant='callToAction' onClick={handleSearch}>Search</Button> :
                        <Button w='full' bg='red.400' onClick={handleCancelSearch}>Cancel</Button>
                    }
                </InputRightElement>
            </InputGroup>
            <Box w='5px' />
        </HStack>
    );

};