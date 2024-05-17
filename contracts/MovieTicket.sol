// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MovieTicket is ERC721 {
    address public owner;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        string date;
        string time;
        string location;
    }

    mapping(uint256 => Occasion) public occasions;
    uint256 public occasionsCount;

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) {
        owner = msg.sender;
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _tickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) external {
        occasionsCount++;
        occasions[occasionsCount] = Occasion(
            occasionsCount,
            _name,
            _cost,
            _tickets,
            _date,
            _time,
            _location
        );
    }

    function getOccasion(uint256 _id) external view returns (Occasion memory) {
        return occasions[_id];
    }

    function updateOccasionsCount(uint256 _count) external {
        occasionsCount = _count;
    }

    function totalMovieOccasions() external view returns (uint256) {
        return occasionsCount;
    }
}
