const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether');
};

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners();
  const NAME = "MovieTicket";
  const SYMBOL = "MTK";

  // Deploy the contract with constructor arguments
  const MovieTicket = await ethers.getContractFactory("MovieTicket");
  const movieTicket = await MovieTicket.deploy(NAME, SYMBOL);

  console.log('Deployed MovieTicket Contract at', await movieTicket.getAddress());

  const occasions = [
    {
      name: "The Garfield Movie",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
    {
      name: "Kingdom of the Planet of the Apes",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
    {
      name: "IF(2024)",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
    {
      name: "GodZilla x Kong: The New Empire",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
    {
      name: "Kung Fu Panda 4",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
    {
      name: "Fall Guy",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
    {
      name: "Abigail",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
    {
      name: "Aavesham",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
    {
      name: "Wish",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
    {
      name: "The Monkey Man",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
    {
      name: "The Little Mermaid",
      cost: tokens(0.015),
      tickets: 10000,
      dates: ["May 18", "May 19", "May 20"],
      times: ["10:00AM GST", "1:00PM GST", "4:00PM GST"],
      locations: ["Al Barsha, Dubai", "Downtown Dubai", "Jumeirah Beach"]
    },
  ];

  for (let i = 0; i < occasions.length; i++) {
    try {
      // List each occasion
      const transaction = await movieTicket.connect(deployer).list(
        occasions[i].name,
        occasions[i].cost,
        occasions[i].tickets,
        occasions[i].dates,
        occasions[i].times,
        occasions[i].locations
      );

      // Wait for the transaction to be mined
      await transaction.wait();
    } catch (error) {
      console.error(`Failed to list occasion ${occasions[i].name}:`, error);
    }
  }

  console.log("Deployment completed.");
}

// Call main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
