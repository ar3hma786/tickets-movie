const { expect } = require("chai");
const { ethers } = require("hardhat");

const NAME = "MovieTicket";
const SYMBOL = "MTK";

const OCCASION_NAME = "ETH Dubai";
const OCCASION_COST = ethers.parseUnits('0.015', 'ether');
const OCCASION_MAX_TICKETS = 10000;
const OCCASION_DATE = "May 18";
const OCCASION_TIME = "10:00AM GST";
const OCCASION_LOCATION = "Al Barsha, Dubai";

describe("MovieTicket", function () {
  let movieTicket;
  let deployer;
  let buyer;

  beforeEach(async function () {
    // Get signers
    [deployer, buyer] = await ethers.getSigners();

    // Deploy the contract
    const MovieTicketFactory = await ethers.getContractFactory("MovieTicket");
    movieTicket = await MovieTicketFactory.deploy(NAME, SYMBOL);

    // Wait for the contract to be deployed
     // Wait for deployment transaction to be mined
     const deploymentTx = movieTicket.deploymentTransaction();
     if (deploymentTx) {
         await deploymentTx.wait();
     } else {
         throw new Error("Deployment transaction is null");
     }

    // List a movie occasion
    await movieTicket.connect(deployer).list(
      OCCASION_NAME,
      OCCASION_COST,
      OCCASION_MAX_TICKETS,
      OCCASION_DATE,
      OCCASION_TIME,
      OCCASION_LOCATION
    );
  });

  describe("Deployment", function () {
    it("Sets the name of the contract", async function () {
      expect(await movieTicket.name()).to.equal(NAME);
    });

    it("Sets the symbol of the contract", async function () {
      expect(await movieTicket.symbol()).to.equal(SYMBOL);
    });

    it("Sets the owner of the contract", async function () {
      expect(await movieTicket.owner()).to.equal(deployer.address);
    });
  });

  describe("MovieOccasion", function () {
    it("Returns occasion attributes", async () => {
      const occasion = await movieTicket.getOccasion(1);
      expect(occasion.id).to.equal(1);
      expect(occasion.name).to.equal(OCCASION_NAME);
      expect(occasion.cost).to.equal(OCCASION_COST);
      expect(occasion.tickets).to.equal(OCCASION_MAX_TICKETS);
      expect(occasion.date).to.equal(OCCASION_DATE);
      expect(occasion.time).to.equal(OCCASION_TIME);
      expect(occasion.location).to.equal(OCCASION_LOCATION);
    });
  });

  describe("Minting", () => {
    const ID = 1;
    const SEAT = 50;
    const AMOUNT = ethers.parseUnits('0.015', 'ether');

    beforeEach(async () => {
      const transaction = await movieTicket.connect(buyer).mint(ID, SEAT, { value: AMOUNT });
      await transaction.wait();
    });

    it('Updates ticket count', async () => {
      const occasion = await movieTicket.getOccasion(1);
      expect(occasion.tickets).to.equal(OCCASION_MAX_TICKETS - 1);
    });

    it('Updates buying status', async () => {
      const status = await movieTicket.hasBought(ID, buyer.address);
      expect(status).to.be.true;
    });

    it('Updates seat status', async () => {
      const owner = await movieTicket.seatTaken(ID, SEAT);
      expect(owner).to.equal(buyer.address);
    });

    it('Updates overall seating status', async () => {
      const seats = await movieTicket.getSeatsTaken(ID);
      expect(seats.length).to.equal(1);
      expect(seats[0]).to.equal(SEAT);
    });

    it('Updates the contract balance', async () => {
      const balance = await ethers.provider.getBalance(movieTicket.getAddress());
      expect(balance).to.equal(AMOUNT);
    });
  });

  describe("Withdrawing", () => {
    const ID = 1;
    const SEAT = 50;
    const AMOUNT = ethers.parseUnits("0.015", 'ether');
    let balanceBefore;

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address);

      const transaction = await movieTicket.connect(buyer).mint(ID, SEAT, { value: AMOUNT });
      await transaction.wait();

      const withdrawTransaction = await movieTicket.connect(deployer).withdraw();
      await withdrawTransaction.wait();
    });

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it('Updates the contract balance', async () => {
      const balance = await ethers.provider.getBalance(movieTicket.getAddress());
      expect(balance).to.equal(0);
    });
  });
});
