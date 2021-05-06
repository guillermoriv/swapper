//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract Swapper is Initializable {
  address private constant UniswapRouter = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  
  function initialize() public initializer {
    console.log("Deploying Swapper in: ", address(this));
  }

  function swapEthForToken(address _token) external payable {
    require(msg.value >= 1, "Need to be greater then one");
    
   address[] memory _path = new address[](2);
    
    _path[0] = IUniswapV2Router02(UniswapRouter).WETH();
    _path[1] = address(_token);

    IUniswapV2Router02(UniswapRouter).swapExactETHForTokens{value: msg.value}(1, _path, msg.sender, block.timestamp);
  }
}
