const { ethers } = require('hardhat');
const assert = require('assert');

let swapper;

beforeEach(async () => {
  swapper = await ethers.getContractAt(
    'Swapper',
    '0x5EB8B569eC853d4eC1F9683a6A1dEa8eF100eac1'
  );
});

describe('Testing the Swapper', () => {
  it('have to be equal to the address of swapper', async () => {
    assert.strictEqual(
      swapper.address,
      '0x5EB8B569eC853d4eC1F9683a6A1dEa8eF100eac1'
    );
  });

  it('change ETH for multiple tokens', async () => {
    await swapper.swapEthForToken(
      [
        '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
        '0x394a7017eafd9fd84840144dcfbbe3923ce5151a',
      ],
      [40, 50],
      { value: ethers.utils.parseEther('0.001') }
    );
  }).timeout(0);
});
