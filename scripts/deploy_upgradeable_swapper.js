const { upgrades, ethers } = require('hardhat');

async function main() {
  const Swapper = await ethers.getContractFactory('SwapperV2');
  console.log('Deploying Swapper...');
  const swapper = await upgrades.deployProxy(
    Swapper,
    ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
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
