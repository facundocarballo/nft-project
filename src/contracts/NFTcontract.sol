// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProyectoNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Facu NFT", "FNFT") {}

    // NFTs
    mapping(uint256 => string) public getNFTname; // getNFTname[tokenID] => name
    mapping(uint256 => string) public getNFTphotoURL; // getNFTphotoURL[tokenID] => photoURL
    mapping(uint256 => string) public getNFTdescription; // getNFTdescription[tokenID] => description

    mapping(address => uint256[]) public getNFTsIDsByAddress; // getTokenIDsByAddress[wallet] => [0, 3, 42, 90, 32, ...]
    mapping(uint256 => address) public getNFTowner; // getNFTowner[tokenID] => address of the owner.

    // Offers
    mapping(uint256 => uint256) public getOfferID; // getOfferID[tokenID] => offerID (actual amount of Offers that this NFT have)
    mapping(uint256 => uint256) public lastOfferIDAcepted; // lastOfferIDAcepted[tokenID] => offerID

    mapping(uint256 => mapping(uint256 => uint256)) public getOfferAmount; // getOfferAmount[tokenID][offerID] => uint256
    mapping(uint256 => mapping(uint256 => address)) public getOfferOwner; // getOfferOwner[tokenID][offerID] => address
    mapping(uint256 => mapping(uint256 => bool)) public isOfferAvailable; // isOfferAvailable[tokenID][offerID] => bool

    mapping(address => uint256) public offersBalance; // offersBalance[wallet] => uint256

    // This two arrays have to have the same length ALLWAYS.
    mapping(address => uint256[]) public getOffersIDof; // getOffersIDof[wallet] => [offerID]
    mapping(address => uint256[]) public getTokensIDoffertedOf; // getTokensIDoffertedOf[wallet] => [tokenID]

    // Aux
    uint256[] private emptyArray;

    // Funcs

    function getTokenID() public view returns(uint256) {
        return _tokenIds.current();
    }

    function createNFT(
        string memory name, 
        string memory description, 
        string memory photoURL
    ) public {
        uint256 tokenID = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(msg.sender, tokenID);

        // Track the NFT
        getNFTname[tokenID] = name;
        getNFTphotoURL[tokenID] = photoURL;
        getNFTdescription[tokenID] = description;
        getNFTowner[tokenID] = msg.sender;

        uint256[] storage myNFTs = getNFTsIDsByAddress[msg.sender];
        myNFTs.push(tokenID);
        getNFTsIDsByAddress[msg.sender] = myNFTs;

    }

    function makeOffer(uint256 tokenID) public payable {
        require(tokenID <= _tokenIds.current(), "This NFT ID that you are trying to buy, doesn't exist. Make sure that you select an existing NFT.");

        // Set the values of the offer
        getOfferOwner[tokenID][getOfferID[tokenID]] = msg.sender;
        isOfferAvailable[tokenID][getOfferID[tokenID]] = true;
        getOfferAmount[tokenID][getOfferID[tokenID]] = msg.value;

        // Increase the total amount that this user offert to any NFT
        offersBalance[msg.sender] += msg.value;

        // Update the list of NFT offerted by this user
        addOfferToTracker(msg.sender, tokenID, getOfferID[tokenID]);

        // Increment by one the offerID of this NFT
        getOfferID[tokenID]++;
    }

    function deleteOffer(uint256 tokenID, uint256 offerID) public payable {
        require(msg.sender == getOfferOwner[tokenID][offerID], "You don't have the rights to delete this offer.");
        require(isOfferAvailable[tokenID][offerID] == true, "This offer isn't available.");
        payable(msg.sender).transfer(getOfferAmount[tokenID][offerID]);

        // Set the offer as unavailable
        isOfferAvailable[tokenID][offerID] = false;

        // Reduce the total amount that this user has offers to any NFT
        offersBalance[msg.sender] -= getOfferAmount[tokenID][offerID];

        // Update the list of NFT offerted by this user
        removeOfferToTracker(msg.sender, tokenID, offerID);
    }

    function deleteAllOffers() public {
        require(offersBalance[msg.sender] > 0, "You don't have offersBalance to claim");
        require(getOffersIDof[msg.sender].length > 0, "You don't have offers to claim");
        payable(msg.sender).transfer(offersBalance[msg.sender]);

        // This two arrays have to have the same length ALLWAYS.
        uint256[] memory offersList = getOffersIDof[msg.sender];
        uint256[] memory tokenOffersList = getTokensIDoffertedOf[msg.sender];
        
        // Set to false all the offers of the user
        for (uint256 i = 0; i < offersList.length; i++) 
            isOfferAvailable[tokenOffersList[i]][offersList[i]] = false;

        // Update the list of NFT offerted by this user
        removeAllOffersToTracker(msg.sender);
        
        offersBalance[msg.sender] = 0;
    }

    function acceptOffer(uint256 tokenID, uint256 offerID) public {
        require(msg.sender == getNFTowner[tokenID], "You don't have the rights to accept this offer.");
        require(isOfferAvailable[tokenID][offerID] == true, "This offer isn't available.");

        transferFrom(msg.sender, getOfferOwner[tokenID][offerID], tokenID); // si no funciona usar _transfer

        updateTokensOwners(msg.sender, getOfferOwner[tokenID][offerID], tokenID);

        payable(msg.sender).transfer(getOfferAmount[tokenID][offerID]);

        lastOfferIDAccepted[tokenID] = offerID;
        isOfferAvailable[tokenID][offerID] = false;

    }

    function updateTokensOwners(address from, address to, uint256 tokenID) private {
        uint256[] storage fromNFTs = getNFTsIDsByAddress[from];
        uint256[] storage newFromNFTs = emptyArray;

        uint256[] storage toNFTs = getNFTsIDsByAddress[to];

        for (uint256 i = 0; i < fromNFTs.length; i++) {
            if (fromNFTs[i] != tokenID) newFromNFTs.push(fromNFTs[i]);
        }

        toNFTs.push(tokenID);

        getNFTsIDsByAddress[from] = newFromNFTs;
        getNFTsIDsByAddress[to] = toNFTs;
        getNFTowner[tokenID] = to;
    }

    function addOfferToTracker(address wallet, uint256 tokenID, uint256 offerID) private {
        uint256[] storage offersIDof = getOffersIDof[wallet];
        uint256[] storage tokensIDoffertedOf = getTokensIDoffertedOf[wallet];

        offersIDof.push(offerID);
        tokensIDoffertedOf.push(tokenID);

        getOffersIDof[wallet] = offersIDof;
        getTokensIDoffertedOf[wallet] = tokensIDoffertedOf;

    }

    function removeOfferToTracker(address wallet, uint256 tokenID, uint256 offerID) private {
        // This two arrays have to have the same length ALLWAYS.
        uint256[] memory offersIDof = getOffersIDof[wallet];
        uint256[] memory tokensIDoffertedOf = getTokensIDoffertedOf[wallet];

        uint256[] storage newOffersIDof = emptyArray;
        uint256[] storage newTokensIDoffertedOf = emptyArray;

        for(uint256 i = 0; i < offersIDof.length; i++) {

            if (tokenID != tokensIDoffertedOf[i] && offerID != offersIDof[i]){
                newOffersIDof.push(offersIDof[i]);
                newTokensIDoffertedOf.push(tokensIDoffertedOf[i]);
            }

        }

        getOffersIDof[wallet] = newOffersIDof;
        getTokensIDoffertedOf[wallet] = newTokensIDoffertedOf;

    }

    function removeAllOffersToTracker(address wallet) private {
        delete getOffersIDof[wallet];
        delete getTokensIDoffertedOf[wallet];
    }

}
