const { ethers } = require('hardhat');
const assert = require('assert');

let swapperV1;

beforeEach(async () => {
  swapperV1 = await ethers.getContractAt(
    'SwapperV1',
    '0x1Cd3e3FB1e9F3cBac605024a85ddB800e94bD0A1'
  );
});

describe('Testing the Swapper', () => {
  it('have to be equal to the address of swapper', async () => {
    assert.strictEqual(
      swapperV1.address,
      '0x1Cd3e3FB1e9F3cBac605024a85ddB800e94bD0A1'
    );
  });

  it('change ETH for multiple tokens', async () => {
    await swapperV1.swapEthForToken(
      [
        '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
        '0x394a7017eafd9fd84840144dcfbbe3923ce5151a',
      ],
      [40, 50],
      { value: ethers.utils.parseEther('0.001') }
    );
  }).timeout(0);

  it('change ETH for multiple tokens with % with decimals', async () => {
    await swapperV1.swapEthForToken(
      [
        '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
        '0x394a7017eafd9fd84840144dcfbbe3923ce5151a',
      ],
      [69.5 * 100, 29.5 ** 100],
      { value: ethers.utils.parseEther('0.001') }
    );
  }).timeout(0);

  it('calling the printVersion', async () => {
    const result = await swapperV1.printVersion();

    assert.strictEqual(result, 'Hello, V1');
  });
});
