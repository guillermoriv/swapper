const { upgrades, ethers } = require('hardhat');

async function main() {
  const Swapper = await ethers.getContractFactory('Swapper');
  console.log('Deploying Swapper...');
  const swapper = await upgrades.deployProxy(
    Swapper,
    ['0xB71Bb954ca4742a9FA3b6a1611249315c2179fEe'],
    { initializer: 'initialize' }
  );
  console.log('Contract deployed in the address: ', swapper.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
