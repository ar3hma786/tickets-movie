// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MovieTicket is ERC721 {
    address public owner;
    uint256 public occasionsCount;
    uint256 public totalSupply;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string[] dates;
        string[] times;
        string[] locations;
    }

    mapping(uint256 => Occasion) public occasions;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => uint256[]) public seatsTaken;

    modifier isOwner {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        owner = msg.sender;
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _tickets,
        string[] memory _dates,
        string[] memory _times,
        string[] memory _locations
    ) public isOwner {
        require(_tickets > 0, "Tickets should be more than 0");
        require(
            _dates.length == _times.length && _dates.length == _locations.length,
            "Dates, times, and locations array lengths should match"
        );

        occasionsCount++;
        occasions[occasionsCount] = Occasion(
            occasionsCount,
            _name,
            _cost,
            _tickets,
            _tickets, // maxTickets is the initial number of tickets
            _dates,
            _times,
            _locations
        );
    }

    function mint(uint256 _id, uint256 _seat) public payable {
        require(_id > 0 && _id <= occasionsCount, "Invalid occasion ID");
        Occasion storage occasion = occasions[_id];

        require(msg.value >= occasion.cost, "Insufficient ETH sent");
        require(_seat > 0 && _seat <= occasion.maxTickets, "Invalid seat number");
        require(seatTaken[_id][_seat] == address(0), "Seat already taken");

        occasion.tickets -= 1;
        hasBought[_id][msg.sender] = true;
        seatTaken[_id][_seat] = msg.sender;
        seatsTaken[_id].push(_seat);

        totalSupply++;
        _safeMint(msg.sender, totalSupply);
    }

    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        require(_id > 0 && _id <= occasionsCount, "Invalid occasion ID");
        return occasions[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        require(_id > 0 && _id <= occasionsCount, "Invalid occasion ID");
        return seatsTaken[_id];
    }

    function withdraw() public isOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
