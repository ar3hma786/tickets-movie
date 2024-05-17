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
    const movieTicketFactory = await ethers.getContractFactory("MovieTicket");
    movieTicket = await movieTicketFactory.deploy(NAME, SYMBOL);

    // Wait for the contract to be deployed
    // await movieTicket.deployed();

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
    it("Set the name of the contract", async function () {
      expect(await movieTicket.name()).to.equal(NAME);
    });

    it("Set the symbol of the contract", async function () {
      expect(await movieTicket.symbol()).to.equal(SYMBOL);
    });

    it("Set the owner of the contract", async function () {
      expect(await movieTicket.owner()).to.equal(deployer.address);
    });
  });

  describe("MovieOccasion", function () {
    it("Returns occasions attributes", async () => {
      const occasion = await movieTicket.getOccasion(1);
      expect(occasion.id).to.be.equal(1);
      expect(occasion.name).to.be.equal(OCCASION_NAME);
      expect(occasion.cost).to.be.equal(OCCASION_COST);
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS);
      expect(occasion.date).to.be.equal(OCCASION_DATE);
      expect(occasion.time).to.be.equal(OCCASION_TIME);
      expect(occasion.location).to.be.equal(OCCASION_LOCATION);
    });

    it("Update occasions count", async function () {
      await movieTicket.updateOccasionsCount(10);
      expect(await movieTicket.totalMovieOccasions()).to.equal(10);
    });
  });
});
