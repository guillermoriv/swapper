const Swapper = artifacts.require('Swapper');

async function main() {
  const swapper = await Swapper.new();
  Swapper.setAsDeployed(swapper);
  console.log('Contract deployed in the address: ', swapper.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
