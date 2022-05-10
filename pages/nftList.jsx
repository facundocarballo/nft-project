import React from "react";
import { VStack, HStack, Spacer, Heading, Text, Box, Image,  } from "@chakra-ui/react";
import Head from 'next/head';
import { NavBar } from '../src/components/navBar';
import { theNavBar } from '../src/functions/navBar';
import { ListNFT } from "../src/components/listNFT";

export default function NFTList() {
    return(
        <>
        <Head>
            <title>NFT List</title>
            <meta name="description" content="List of all NFTs." />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar {...theNavBar}/>
        <Box h='85px' />
        <ListNFT />
        </>
    );
}