const { upgrades, ethers } = require('hardhat');
const assert = require('assert');

let swapperV2;

before(async () => {
  const Swapper = await ethers.getContractFactory('SwapperV1');
  const SwapperV2 = await ethers.getContractFactory('SwapperV2');

  const swapper = await upgrades.deployProxy(
    Swapper,
    ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
    { initializer: 'initialize' }
  );
  await swapper.deployed();

  swapperV2 = await upgrades.upgradeProxy(swapper.address, SwapperV2);
});

describe('Testing the Swapper', () => {
  it('print version of the contract', async () => {
    console.log(await swapperV2.printVersion());
  });

  it('change ETH for multiple tokens with balancer', async () => {
    const porcents = [40 * 10, 60 * 10];

    console.log(porcents);

    await swapperV2.swapEthForTokensBalancer(
      [
        '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
        '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
      ],
      [porcents[0], porcents[1]],
      { value: ethers.utils.parseEther('2') }
    );
  }).timeout(30000000);

  it('change ETH for multiple tokens with % with decimals with balancer', async () => {
    const porcents = [70.5 * 10, 29.5 * 10];

    console.log(porcents);

    await swapperV2.swapEthForTokensBalancer(
      [
        '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
        '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
      ],
      [porcents[0], porcents[1]],
      { value: ethers.utils.parseEther('4') }
    );
  }).timeout(30000000);

  it('change ETH for multiple tokens with uniswap', async () => {
    const porcents = [40 * 10, 60 * 10];

    console.log(porcents);

    await swapperV2.swapEthForToken(
      [
        '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
        '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
      ],
      [porcents[0], porcents[1]],
      { value: ethers.utils.parseEther('0.00001') }
    );
  }).timeout(30000000);

  it('change ETH for multiple tokens with % with decimals with uniswap', async () => {
    const porcents = [70.5 * 10, 29.5 * 10];

    console.log(porcents);

    await swapperV2.swapEthForToken(
      [
        '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
        '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
      ],
      [porcents[0], porcents[1]],
      { value: ethers.utils.parseEther('4') }
    );
  }).timeout(30000000);
});
