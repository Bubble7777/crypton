const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address); 

  const Donat = await hre.ethers.getContractFactory("Donat");
  const Donat = await Donat.deploy();
  await Donat.deployed();

  console.log("Donat deployed to:", Donat.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });