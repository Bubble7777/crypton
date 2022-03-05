require("@nomiclabs/hardhat-web3");

task("donators", "Get donators of contract")
  .setAction(async (taskArgs) => {
    const instance = await hre.ethers.getContractAt("Donat", process.env.INFURA_CONTRACT_ADDRESS);
    console.log(await instance.getDonators())
  })