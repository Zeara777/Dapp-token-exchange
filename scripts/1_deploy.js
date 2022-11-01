async function main() {
  //Fetch contract to be deployed
  const Token = await ethers.getContractFactory("Token")

  //Deploy contract
  const token = await Token.deploy()
  //Fetch a copy of the deployed token
  await token.deployed()
  console.log(`Token Deployed to: ${token.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
