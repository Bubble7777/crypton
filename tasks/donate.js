require("@nomiclabs/hardhat-web3");

task("donate", "Donate Ethereum to contract")
  .addParam("value", "Amount value")
  .setAction(async (taskArgs) => {
    const instance = await hre.ethers.getContractAt("Donat", process.env.INFURA_CONTRACT_ADDRESS);
    await instance.donate({value: taskArgs.value});
  });

module.exports = {};