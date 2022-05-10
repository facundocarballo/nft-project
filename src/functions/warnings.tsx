import { WarningProps } from '../components/warning';

export const connectWallet: WarningProps = {
    props: {
        photoURL: 'https://i.ibb.co/jgR5nn6/wallet.png',
        label: 'Connect your Wallet',
    }
};

export const connectNetwork: WarningProps = {
    props: {
        photoURL: 'https://i.ibb.co/Dt6sfXH/warning.png',
        label: 'Please connect to Binance Smart Chain Testnet or Rinkeby Testnet',
    }
};

export const createNFT: WarningProps = {
    props: {
        photoURL: 'https://i.ibb.co/QXdSnMh/SHH.png',
        label: "You don't have any NFT",
        button: {
            href: '/createNFT',
            label: 'Create NFT'
        }
    }
}