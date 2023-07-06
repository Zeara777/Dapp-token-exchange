async function main() {
  console.log(`Preparing deployment...\n`)

  //Fetch contracts to be deployed
  const Token = await ethers.getContractFactory('Token')
  const Exchange = await ethers.getContractFactory('Exchange')

  //Fetch accounts
  const accounts = await ethers.getSigners()

  console.log(`Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`)

  //Deploy contracts
  const dapp = await Token.deploy('Dapp University', 'DAPP', '1000000')
  await dapp.deployed() //Fetch a copy of the deployed token
  console.log(`DAPP Deployed to: ${dapp.address}`)

  const mETH = await Token.deploy('mETH', 'mETH', '1000000')
  await mETH.deployed() //Fetch a copy of the deployed token
  console.log(`mETH Deployed to: ${mETH.address}`)

  const mDAI = await Token.deploy('mDAI', 'mDAI', '1000000')
  await mDAI.deployed() //Fetch a copy of the deployed token
  console.log(`mDAI Deployed to: ${mDAI.address}`)

  const exchange = await Exchange.deploy(accounts[1].address, 10)
  await exchange.deployed() //Fetch a copy of the deploye exchange
  console.log(`Exchange Deployed: ${exchange.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode(1);
});
