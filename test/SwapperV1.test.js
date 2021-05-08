const { ethers } = require('hardhat');
const assert = require('assert');

let swapper;

beforeEach(async () => {
  swapper = await ethers.getContractAt(
    'Swapper',
    '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'
  );
});

describe('Testing the Swapper', () => {
  it('have to be equal to the address of swapper', async () => {
    assert.strictEqual(
      swapper.address,
      '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'
    );
  });

  it('change ETH for multiple tokens', async () => {
    const porcents = [40 * 10, 60 * 10];

    console.log(porcents);

    await swapper.swapEthForToken(
      [
        '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
        '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
      ],
      [porcents[0], porcents[1]],
      { value: ethers.utils.parseEther('0.00001') }
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
      { value: ethers.utils.parseEther('4') }
    );
  }).timeout(0);

  it('calling the printVersion', async () => {
    const result = await swapper.printVersion();

    console.log(result);
  });
});
