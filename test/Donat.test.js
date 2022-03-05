const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Donat", function () {
  let owner
  let acc1
  let acc2
  let acc3

  beforeEach(async function () {
    [owner, acc1, acc2, acc3] = await ethers.getSigners();
    Donat = await ethers.getContractFactory("Donat", owner);

    donat = await Donat.deploy();
    await donat.deployed()
  });

  it('Should be deployed', async function (){
     expect(donat.address).to.be.properAddress
    })
    
  it("should be Donate ", async function(){
    const tx = await donat.connect(acc1).donate({value: 200})
    await expect(() => tx).to.changeEtherBalances([acc1, donat], [-200, 200]);
    await tx.wait()

    expect(await donat.getBalance(acc1.address)).to.eq(200)
  })

  it("should be Donate from 2 accounts ", async function(){
    const tx = await donat.connect(acc1).donate({value: 350})
    await expect(() => tx).to.changeEtherBalances([acc1, donat], [-350, 350]);
    await tx.wait()

    expect(await donat.getBalance(acc1.address)).to.eq(350)

    const tx2 = await donat.connect(acc2).donate({value: 200})
    await expect(() => tx2).to.changeEtherBalances([acc2, donat], [-200, 200]);
    await tx2.wait()

    expect(await donat.getBalance(acc2.address)).to.eq(200)
  })

  it("shoulb be withdrawDonation success", async function(){
     
    const tx = await donat.connect(owner).donate({value: 250})
    await tx.wait()


    
    const tx2 = await donat.connect(owner).withdrawDonation(acc1.address, 250)
    await expect(() => tx2).to.changeEtherBalances([acc1, donat], [250, -250])
    await tx2.wait()
  })

  it("shoulb be getDonators success", async function(){
     
     
    for(let i = 1; i < 10; i++){
      const tx = await donat.connect(owner).donate({value: 250})
      await tx.wait()
      const tx2 = await donat.connect(acc1).donate({value: 250})
      await tx2.wait()
      const tx3 = await donat.connect(acc2).donate({value: 250})
      await tx3.wait()
    }
    expect(await donat.getDonators()).to.eql([owner.address,acc1.address,acc2.address])

  })



});
