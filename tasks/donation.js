require("@nomiclabs/hardhat-web3");

task("donations", "Get donations to contrat by address")
  .addParam("address", "Donator's address")
  .setAction(async (taskArgs) => {
    const instance = await hre.ethers.getContractAt("Donat", process.env.INFURA_CONTRACT_ADDRESS);
    console.log(await instance.getDonations(taskArgs.address));
  });

module.exports = {};