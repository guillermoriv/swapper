const { upgrades, ethers } = require('hardhat');

async function main() {
  const SwapperV1 = await ethers.getContractFactory('SwapperV1');
  console.log('Deploying Swapper...');
  await upgrades.upgradeProxy(
    '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
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
