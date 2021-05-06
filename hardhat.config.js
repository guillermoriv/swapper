require('@nomiclabs/hardhat-truffle5');
require('@nomiclabs/hardhat-web3');
require('@nomiclabs/hardhat-truffle5');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await web3.eth.getAccounts();

  for (const account of accounts) {
    console.log(account);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    rinkeby: {
      url:
        'https://eth-rinkeby.alchemyapi.io/v2/am_fb42tWDfhZ88EkuQKe0g9ueeWh14j',
      accounts: [
        `0x3577673fe76f48cdbebe3da7bfbf176f7bc0bb578e09319a1010fb6893fc59ba`,
      ],
      timeout: 300000,
    },
  },
};
