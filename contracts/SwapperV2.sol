//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./IExchangeProxy.sol";

contract SwapperV2 is Initializable {
  address private constant UniswapRouter = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address private admin;
  using SafeMath for uint;

  address private constant proxyExchange = 0x3E66B66Fd1d0b02fDa6C811Da9E0547970DB2f21;
  address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  address private constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

   function initialize(address _admin) public initializer {
    admin = _admin;
  }

  function swapEthForToken(address[] memory _tokens, uint256[] memory _porcents) external payable {
    /*
      The value in wei, needs to be greater than 1.
    */
    require(msg.value >= 1, "Need to be greater then one");
    
    for (uint i = 0; i < _tokens.length; i++) {
      /*
        This is the calculation of the %, already knowing that
        the porcent needs to be between 1 and 1000, because we can't
        handle decimals, so we pass the value %95.5 as 955 then divide that
        for 1000 and get 0.955.
      */

      require(_porcents[i] >= 1 && _porcents[i] <= 1000, "Something between 1 and 1000");

      address[] memory _path = new address[](2);
    
      _path[0] = IUniswapV2Router02(UniswapRouter).WETH();
      _path[1] = address(_tokens[i]);

      IUniswapV2Router02(UniswapRouter).swapExactETHForTokens{value: msg.value.mul(_porcents[i]).div(1000)}
      (1, _path, msg.sender, block.timestamp + 3600);
    }
  }

  function swapEthForTokensBalancer(address[] memory _tokens, uint256[] memory _porcents) external payable {
    /*
      The value in wei, needs to be greater than 1.
    */
    require(msg.value >= 1, "Need to be greater then one");
    
    for (uint i = 0; i < _tokens.length; i++) {
      /*
        This is the calculation of the %, already knowing that
        the porcent needs to be between 1 and 1000, because we can't
        handle decimals, so we pass the value %95.5 as 955 then divide that
        for 1000 and get 0.955.
      */

      require(_porcents[i] >= 1 && _porcents[i] <= 1000, "Something between 1 and 1000");


      (IExchangeProxy.Swap[] memory swaps, uint256 amountIn) = IExchangeProxy(proxyExchange).viewSplitExactIn(WETH, _tokens[i], msg.value.mul(_porcents[i]).div(1000), 10);
      IExchangeProxy(proxyExchange).batchSwapExactIn{value: msg.value.mul(_porcents[i]).div(1000)}(swaps, TokenInterface(ETH), TokenInterface(_tokens[i]), amountIn, 10);
      TokenInterface(_tokens[i]).transfer(msg.sender, TokenInterface(_tokens[i]).balanceOf(address(this)));
    }
  }

  function printVersion() external pure returns(string memory) {
    return "Hello, this is version SwapperV2";
  }
}
