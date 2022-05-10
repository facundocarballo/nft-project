import React from 'react';

const ProjectNFTContext = React.createContext(null);

export const ProjectNFTProvider = (props: any) => {

    const [addressAccount, setAddressAccount] = React.useState<string>('');
    const [cryptoAmount, setCryptoAmount] = React.useState<number>(0);
    const [network, setNetwork] = React.useState<number>(0);
    const [nftsOfUser, setNftsOfUser] = React.useState(null);
    const [contract, setContract] = React.useState(null);
    const [contractAddress, setContractAddress] = React.useState('');

    const [searchInputValue, setSearchInputValue] = React.useState('');
    const [isSearching, setIsSearching] = React.useState(false);


    const values = {
        addressAccount, setAddressAccount,
        cryptoAmount, setCryptoAmount,
        network, setNetwork,
        nftsOfUser, setNftsOfUser,
        searchInputValue, setSearchInputValue,
        contract, setContract,
        contractAddress, setContractAddress,
        isSearching, setIsSearching
    };

    return <ProjectNFTContext.Provider value={values} {...props} />
};

export const useProjectNFTProvider = () => {
    const context = React.useContext(ProjectNFTContext);
    if (!context) throw new Error("useProjectNFTProvider have to be call inside of the ProjectNFTProvider (which wraps the components that can read this data).");
    return context;
};