//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;  

interface TokenInterface {
    function balanceOf(address) external view returns (uint);
    function allowance(address, address) external view returns (uint);
    function approve(address, uint) external returns (bool);
    function transfer(address, uint) external returns (bool);
    function transferFrom(address, address, uint) external returns (bool);
    function deposit() external payable;
    function withdraw(uint) external;
}

interface IExchangeProxy {
    struct Swap {
      address pool;
      address tokenIn;
      address tokenOut;
      uint swapAmount; // tokenInAmount / tokenOutAmount
      uint limitReturnAmount; // minAmountOut / maxAmountIn
      uint maxPrice;
    }

    function batchSwapExactIn(
        Swap[] memory swaps,
        TokenInterface tokenIn,
        TokenInterface tokenOut,
        uint totalAmountIn,
        uint minTotalAmountOut
    )
        external payable
        returns (uint totalAmountOut);

    function viewSplitExactIn(
        address tokenIn,
        address tokenOut,
        uint swapAmount,
        uint nPools
    )
      external view
      returns (Swap[] memory swaps, uint totalOutput);

    function smartSwapExactIn(
          TokenInterface tokenIn,
          TokenInterface tokenOut,
          uint totalAmountIn,
          uint minTotalAmountOut,
          uint nPools
      )
        external payable
        returns (uint totalAmountOut);
}