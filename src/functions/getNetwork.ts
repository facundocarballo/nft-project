interface INetwork {
    name: string,
    rpc: string,
    id: number,
    symbol: string,
    scanURL: string
}

// Deberiamos tener un archivo por cada Network
const Ethereum_Rinkeby: INetwork = {
    name: "Ethereum Rinkeby",
    rpc: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // "https://speedy-nodes-nyc.moralis.io/2912346aef06f91434f92aa1/eth/rinkeby",
    id: 4,
    symbol: "ETH",
    scanURL: "https://rinkeby.etherscan.io/",
};

const BNB_Testnet: INetwork = {
    name: "BNB Testnet",
    rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    id: 97,
    symbol: "BNB",
    scanURL: "https://testnet.bscscan.com/"
};

// Deberiamos tener un archivo para mostrar todos las Networks disponibles.
const Networks: INetwork[] = [
    Ethereum_Rinkeby,
    BNB_Testnet
];

export const getNetwork = (id: number): any => {
    for(var i = 0; i < Networks.length; i++) {
        if (Networks[i].id == id) return Networks[i];
    }
    return null;
    
};

