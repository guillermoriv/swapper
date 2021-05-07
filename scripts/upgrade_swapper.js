const { upgrades, ethers } = require('hardhat');

async function main() {
  const SwapperV1 = await ethers.getContractFactory('SwapperV1');
  console.log('Deploying Swapper...');
  await upgrades.upgradeProxy(
    '0x1Cd3e3FB1e9F3cBac605024a85ddB800e94bD0A1',
    SwapperV1
  );
  console.log('Swapper updated to SwapperV1');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
