pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Dragon is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 internal mintFee;
    uint256 internal evolveFee;
    string internal pinataFolderUrl;

    struct DragonInstance {
        uint256 lvl;
        string color;
    }

    DragonInstance[] public dragons;

    constructor() public ERC721("Dragon", "DRAGON") {
        mintFee = 0.001 * 10**18;
        evolveFee = 0.0005 * 10**18;
        pinataFolderUrl = "https://gateway.pinata.cloud/ipfs/QmXd8hyrARgEXRopPSpMoBzjUX9HHJjx7y9VHt4tn9Bm5v/";
    }

    function mintDragonEgg(address recipient, string memory nftType) public payable returns (uint256) {
        require(msg.value == mintFee, "The relevant fee was not paid.");

        uint256 newItemId = _tokenIds.current();
        string memory fileName = concatenate("dragonEgg", nftType);
        string memory fullFileName = concatenate(fileName, ".json");
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, concatenate(pinataFolderUrl, fullFileName));
        dragons.push(DragonInstance(1, nftType));
        _tokenIds.increment();

        return newItemId;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function count() public view returns (uint256) {
        return _tokenIds.current();
    }

    function hatchDragonEgg(uint256 tokenId) public payable returns (uint256) {
        require(msg.value == evolveFee, "The relevant fee was not paid.");
        require(msg.sender == ownerOf(tokenId), "You can not hatch egg that you do not own.");

        string memory fileName = concatenate("dragon", dragons[tokenId].color);
        string memory fullFileName = concatenate(fileName, ".json");

        _setTokenURI(tokenId, concatenate(pinataFolderUrl, fullFileName));

        return tokenId;
    }

    function concatenate(string memory a, string memory b) internal pure returns (string memory){
        return string(abi.encodePacked(a, b));
    }
}
