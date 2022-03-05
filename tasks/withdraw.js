require("@nomiclabs/hardhat-web3");

task("withdraw", "Withdraw all donations to address")
  .addParam("address", "Withdraw's address")
  .addParam("value", "Withdraw's value")
  .setAction(async (taskArgs) => {
    const instance = await hre.ethers.getContractAt("MakeDonations", process.env.INFURA_CONTRACT_ADDRESS);
    await instance.withdrawDonation(taskArgs.address, taskArgs.value);
  });

module.exports = {};