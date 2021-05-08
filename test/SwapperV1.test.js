const { ethers } = require('hardhat');
const assert = require('assert');

let swapper;

before(async () => {
  const Swapper = await ethers.getContractFactory('SwapperV1');
  swapper = await upgrades.deployProxy(
    Swapper,
    ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
    { initializer: 'initialize' }
  );
  await swapper.deployed();
});

describe('Testing the Swapper', () => {
  it('change ETH for multiple tokens', async () => {
    const porcents = [40 * 10, 60 * 10];

    console.log(porcents);

    await swapper.swapEthForToken(
      [
        '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
        '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
      ],
      [porcents[0], porcents[1]],
      { value: ethers.utils.parseEther('1') }
    );
  }).timeout(0);

  it('change ETH for multiple tokens with % with decimals', async () => {
    const porcents = [70.5 * 10, 29.5 * 10];

    console.log(porcents);

    await swapper.swapEthForToken(
      [
        '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
        '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
      ],
      [porcents[0], porcents[1]],
      { value: ethers.utils.parseEther('1') }
    );
  }).timeout(0);

  it('calling the printVersion', async () => {
    const result = await swapper.printVersion();

    console.log(result);
  });
});
