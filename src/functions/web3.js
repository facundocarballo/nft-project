import Web3 from 'web3';
import NFTContract from '../contracts/ABI/contractABI.json';
import { getNetwork } from './getNetwork';


// Global Variables
const Contract = require('web3-eth-contract');


// Contracts Address
const CONTRACT_ADDRESS_RINKEBY = "0xb0CAB79aDDA739709cF6715bee18632aA525C772"; //"0x92D27E13EeC8Cce8E05eEA7f6ba7b2FCfc71e878";
const CONTRACT_ADDRESS_BNB_TESTNET = "0x5eb88f53d9dC788FA2EEf5157654cB3Cf13eAa8B";


export const loadData = async () => {

    await loadWeb3();

    const { accountAddress, cryptoAmount, networkID } = await loadAccountInfo();

    const ContractAddress = networkID == 97 ? CONTRACT_ADDRESS_BNB_TESTNET : CONTRACT_ADDRESS_RINKEBY;

    const Network = getNetwork(networkID);
    // Set Provider
    if (Network != null) {
        Contract.setProvider(Network.rpc);
    }else {
        console.log("We don't support this Network " + web3.eth.getChainId());
    }

    const ContractNFT = new Contract(
        NFTContract.output.abi, 
        ContractAddress
    );
    
    const myNFTbalance = await ContractNFT.methods.balanceOf(accountAddress).call();

    const myNFTs = await getMyNFTs(ContractNFT, accountAddress, myNFTbalance);
    

    return { 
        accountAddress, cryptoAmount, Network, 
        ContractAddress, ContractNFT, myNFTbalance, 
        myNFTs 
    };
};

export const getNFT = async (ContractNFT, tokenID) => {
    const name = await ContractNFT.methods.getNFTname(tokenID).call();
    const photoURL = await ContractNFT.methods.getNFTphotoURL(tokenID).call();
    const description = await ContractNFT.methods.getNFTdescription(tokenID).call();
    const ownerAddress = await ContractNFT.methods.getNFTowner(tokenID).call();

    return {
        name: name,
        photoURL: photoURL,
        description: description,
        ownerAddress: ownerAddress,
        id: tokenID
    };
};

export const getOffer = async (ContractNFT, tokenID, offerID) => {
    const offerOwner = await ContractNFT.methods.getOfferOwner(tokenID, offerID).call();
    const offerAmount = await ContractNFT.methods.getOfferAmount(tokenID, offerID).call();
    const offetAmountETH = await web3.utils.fromWei(offerAmount, 'ether');
    const offerState = await ContractNFT.methods.isOfferAvailable(tokenID, offerID).call();
    return {
        id: offerID,
        owner: offerOwner,
        amount: offetAmountETH,
        state: offerState
    };
};

export const getOffers = async (ContractNFT, tokenID) => {
    var offers = [];
    const totalOffersOfNFT = await ContractNFT.methods.getOfferID(tokenID).call();
    const lastOfferIDAcepted = await ContractNFT.methods.lastOfferIDAcepted(tokenID).call(); 

    for (var i = lastOfferIDAcepted; i < totalOffersOfNFT; i++) {
        const offer = await getOffer(ContractNFT, tokenID, i);
        offers.push(offer);
    }

    return offers
};

export const getListOfNFTs = async (ContractNFT) => {
    var NFTs = [];
    
    const totalAmountOfNFTs = await ContractNFT.methods.getTokenID().call();
    var j = 0;

    // We will return the last 30 NFTs Minted, if the user wants to see another NFT the user will have to search it.
    for(var i = (totalAmountOfNFTs - 1); i >= 0 && j < 30; i--) {

        const nft = await getNFT(ContractNFT, i);

        NFTs.push(nft);

        j++;
    }

    return NFTs;
};



export const createNFT = async (ContractNFT, name, description, photoURL, accountAddress, contractAddress) => {
    const data = ContractNFT.methods.createNFT(name, description, photoURL).encodeABI();

    const params = {
        from: accountAddress,
        to: contractAddress,
        gas: window.web3.utils.toHex(500000), // Gas limit
        gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('50', 'gwei')),
        data: data
    };

    ethereum.request({
        method: 'eth_sendTransaction',
        params: [params]
    }).then((res) => {
        console.log('Transaction Hash: ', res);
    });

};

const getMyNFTs = async (ContractNFT, accountAddress, nftAmount) => {
    var myNftIDs = [];
    var myNFTs = [];

    // Get the tokenIDs that the user owns.
    for(var i = 0; i < nftAmount; i++) {
        const nftID = await ContractNFT.methods.getNFTsIDsByAddress(accountAddress, i).call();
        myNftIDs.push(nftID);
    }

    // Get the struct of these NFTs.
    for (var i = 0; i < myNftIDs.length; i++) {
        const nft = await getNFT(ContractNFT, myNftIDs[i]);
        myNFTs.push(nft);
    }

    return myNFTs;
};

const loadAccountInfo = async () => {

    const accountAddress = await window.web3.eth.getCoinbase(); 

    const cryptoAmountWEI = await window.web3.eth.getBalance(accountAddress); 
    const cryptoAmount = Number(window.web3.utils.fromWei(cryptoAmountWEI, 'ether')).toFixed(2);

    const networkID = await window.web3.eth.getChainId();

    return { accountAddress, cryptoAmount, networkID };

};

const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({method: 'eth_requestAccounts'});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};