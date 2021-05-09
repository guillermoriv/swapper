const { upgrades, ethers } = require('hardhat');
const assert = require('assert');
const got = require('got');

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
    await swapperV2.printVersion();
  });

  it('change ETH for multiple tokens with balancer', async () => {
    const porcents = [40 * 10, 60 * 10];
    const tokens = [
      '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
    ];

    for (let i = 0; i < tokens.length; i++) {
      const transaction = await swapperV2.swapEthForTokensBalancer(
        tokens[i],
        porcents[i],
        {
          value: ethers.utils.parseEther('1'),
        }
      );

      const receipt = await transaction.wait();
      console.log('Gas used for this transaction: ');
      console.log(receipt.gasUsed.toString());
    }
  }).timeout(30000000);

  it('change ETH for multiple tokens with % with decimals with balancer', async () => {
    const porcents = [70.5 * 10, 29.5 * 10];
    const tokens = [
      '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
    ];

    for (let i = 0; i < tokens.length; i++) {
      const transaction = await swapperV2.swapEthForTokensBalancer(
        tokens[i],
        porcents[i],
        {
          value: ethers.utils.parseEther('1'),
        }
      );

      const receipt = await transaction.wait();
      console.log('Gas used for this transaction: ');
      console.log(receipt.gasUsed.toString());
    }
  }).timeout(30000000);

  it('change ETH for multiple tokens with uniswap', async () => {
    const porcents = [40 * 10, 60 * 10];
    const tokens = [
      '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
    ];

    for (let i = 0; i < tokens.length; i++) {
      const transaction = await swapperV2.swapEthForToken(
        tokens[i],
        porcents[i],
        {
          value: ethers.utils.parseEther('1'),
        }
      );

      const receipt = await transaction.wait();
      console.log('Gas used for this transaction: ');
      console.log(receipt.gasUsed.toString());
    }
  }).timeout(30000000);

  it('change ETH for multiple tokens with % with decimals with uniswap', async () => {
    const porcents = [70.5 * 10, 29.5 * 10];
    const tokens = [
      '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
    ];

    for (let i = 0; i < tokens.length; i++) {
      const transaction = await swapperV2.swapEthForToken(
        tokens[i],
        porcents[i],
        {
          value: ethers.utils.parseEther('1'),
        }
      );

      const receipt = await transaction.wait();
      console.log('Gas used for this transaction: ');
      console.log(receipt.gasUsed.toString());
    }
  }).timeout(30000000);

  it('choosing between dexes and who have best price', async () => {
    const porcents = [40 * 10, 60 * 10];
    const tokens = [
      '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI Stablecoin
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Uniswap Token
    ];

    for (let i = 0; i < tokens.length; i++) {
      const inchUrl = `https://api.1inch.exchange/v3.0/1/quote?fromTokenAddress=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&toTokenAddress=${
        tokens[i]
      }&amount=${ethers.utils.parseEther('1')}&protocols=UNISWAP_V2,BALANCER`;

      const result = await got(inchUrl);
      const parsedResult = JSON.parse(result.body);

      if (parsedResult.protocols[0][0][0].name === 'UNISWAP_V2') {
        const transaction = await swapperV2.swapEthForToken(
          tokens[i],
          porcents[i],
          {
            value: ethers.utils.parseEther('1'),
          }
        );

        const receipt = await transaction.wait();
        console.log('UNISWAP');
        console.log('Gas used for this transaction: ');
        console.log(receipt.gasUsed.toString());
      }

      if (parsedResult.protocols[0][0][0].name === 'BALANCER') {
        const transaction = await swapperV2.swapEthForTokensBalancer(
          tokens[i],
          porcents[i],
          {
            value: ethers.utils.parseEther('1'),
          }
        );

        const receipt = await transaction.wait();
        console.log('BALANCER');
        console.log('Gas used for this transaction: ');
        console.log(receipt.gasUsed.toString());
      }
    }
  }).timeout(30000000);
});
