const { artifacts, assert, web3 } = require('hardhat');

const Swapper = artifacts.require('Swapper');
let swapper;

beforeEach(async () => {
  swapper = await Swapper.at('0x95E8DC281cf200bCB4eCa66B584695Ee6d931C99');
});

describe('Testing the swapper', () => {
  it('Changing ETH for DAI', async () => {
    const account = await web3.eth.getAccounts()[0];
    await swapper.swapEthForToken(
      '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
      { value: 20000, from: account }
    );
  });
});
