const { ethers } = require('hardhat');
const assert = require('assert');

let swapperV2;

beforeEach(async () => {
  swapperV2 = await ethers.getContractAt(
    'SwapperV2',
    '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'
  );
});

describe('Testing the Swapper', () => {
  // it('have to be equal to the address of swapper', async () => {
  //   assert.strictEqual(
  //     swapper.address,
  //     '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'
  //   );
  // });

  it('change ETH for multiple tokens', async () => {
    const porcents = [40 * 10, 60 * 10];

    console.log(porcents);

    await swapperV2.swapEthForTokensBalancer(
      [
        '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
        '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
      ],
      { value: ethers.utils.parseEther('1') }
    );
  }).timeout(0);
});
