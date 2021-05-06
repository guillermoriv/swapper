const { artifacts, assert, web3 } = require('hardhat');

const Swapper = artifacts.require('Swapper');
let swapper;

beforeEach(async () => {
  swapper = await Swapper.at('0x92c40B26b439d31fF3E2c3668157C870660e95E2');
});

describe('Testing the swapper', () => {
  it('Changing ETH for DAI', async () => {
    const account = await web3.eth.getAccounts();
    await swapper.swapEthForToken(
      '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
      { value: await web3.utils.toWei('1', 'ether'), from: account[0] }
    );
  });
});
