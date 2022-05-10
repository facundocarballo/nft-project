import React from 'react';
import { VStack, HStack, Spacer, Box, Text, Heading, Input, Button } from '@chakra-ui/react';
import Head from 'next/head';
import { NavBar } from '../src/components/navBar';
import { theNavBar } from '../src/functions/navBar';
import { CreateNFT } from '../src/components/createNFT';

export default function PageCreateNFT() {
    return(
       <>
        <Head>
            <title>Create NFT</title>
            <meta name="description" content="Create your own NFT." />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar {...theNavBar}/>
        <Box h='75px' />
        <CreateNFT />
       </>
    );
};